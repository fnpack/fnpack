import { Member } from '../../fnpack/fnpack'
import { EventStream } from '../../fnpack/eventStream'
import { CallChain, CallableFile } from '../../fnpack/callChain'
import { nameHash } from '../../util/hashing'
import { writeTo } from '../../util/fileUtils'
import { resolve } from 'path';
const defaultTestPath = resolve(__dirname, '../runtime/singletonTest.js');

export interface ColocatedMember {
    //the name for the function
    name: string,
    streams: EventStream[],
    //a map of call chain name to call chain
    chains: CallChain[],//{[key:string]:CallChain},
    // files that will return the name of the chain if the event fits
    tests: CallableFile[]
}

export async function collapse (members: Member[], buildDir: string): Promise<ColocatedMember[]> {
    const colocatables: Member[] = members
        .filter(isColocatable)

    const colocated: ColocatedMember = await collapseMembers(colocatables, buildDir);
    return (await Promise.all(members
        .filter(m => !isColocatable(m))
        .map(m => collapseMembers([m], buildDir))))
        .concat(colocated);
}

async function collapseMembers (members: Member[], buildDir: string): Promise<ColocatedMember> {
    return {
        name: getName(members.map(m => m.chain)),
        streams: members.map(m => m.stream),
        chains: members.map(m => {
            ensureChainIsNamed(m.chain)
            return m.chain
        }),
        tests: await Promise.all(members.map(m => getTest(m, buildDir)))
    }
}

function getName (chains: CallChain[]): string {
    //go through the chain and find a good name for the member
    for (let i = 0; i<chains.length; i++) {
        if (chains[i].name !== undefined) {
            return chains[i].name;
        }
    }
    return `anonMember${nameHash(chains)}`;
}

//code gen something that can be called at runtime to test if the thing works
// this writes out a file that's called to test if a given call chain should be called
async function getTest (member: Member, buildDir: string): Promise<CallableFile> {
    //test if its colocatable, else get the default callable file
    if (typeof member.stream['colocationTest'] !== 'object') {
        return new CallableFile(defaultTestPath, 'js');
    }
    const test: any = member.stream['colocationTest'];
    const config: any = test.getConfig();
    const testFnString: string = test.test.toString();
    const testPath: string = resolve(buildDir, `testFor${member.chain.name}.js`);

    const testFileString: string = `
const config = JSON.parse('${JSON.stringify(config)}');
exports.default = function (event) {
    if (test(event, config)) {
        return '${member.chain.name}';
    }
    return false;
}

const test = ${testFnString};`

    await writeTo(testFileString, testPath);

    return new CallableFile(testPath, 'js');
}

function ensureChainIsNamed (chain: CallChain): void {
    if (chain.name === undefined) {
        // todo: this might not be strong enough
        chain.name = `anonChain${nameHash(chain)}`;
    }
}

function isColocatable (member: Member): boolean {
    return typeof member.stream['colocationTest'] === 'object';
}
