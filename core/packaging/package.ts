import { PackedMember } from './packedMember'
import { CallableFile, Callable } from "../../fnpack/callChain";
import { ColocatedMember } from '../colocation/collapse'
import { CallableWriterFactory } from '../callables/callableWriter';
// import { EventStream } from '../../fnpack/eventStream';
import * as stdPath from 'path';
const handlerPath = stdPath.resolve(__dirname, '../runtime/handler.js');
import { writeTo, read } from '../../util/fileUtils';
// import { nameHash } from '../../util/hashing';
import { zip } from '../../util/zip';
//this is only happy if we require webpack
const webpack = require('webpack');

export async function packMembers (members: ColocatedMember[], buildDirLocation: string): Promise<PackedMember[]> {
    const normalizedMembers: string[] = await Promise.all(members.map(async member => {

        const namedCallableFiles = await Promise.all(member.chains.map(async chain => {
            const normalizedLinks: CallableFile[] = await Promise.all(chain.links
                .map(link => normalize(link, buildDirLocation)));
            return [chain.name, normalizedLinks];
        }));

        const chainDictionary = `
const chains = {
    ${namedCallableFiles
        .map(tuple => `${tuple[0]}: JSON.parse('${JSON.stringify(dumpChain(tuple[1] as CallableFile[]))}')`)
        .join(',\n')}
};
`;
        const environment = `
const environment = {
    ${namedCallableFiles
        .map(t => t[1] as CallableFile[])
        .reduce((f, n) => f.concat(n), [])
        .map(file => `local_${file.name}: require('${file.path}').${file.exportName}`)
        .join(',\n')}
};
`;

        const tests = `
const tests = [
    ${member.tests
        .map(test => `require('${test.path}').${test.exportName}`)
        .join(',\n')}
];
`

        const importHead = environment + chainDictionary + tests;
        console.log(importHead)

        await writeTo(
            importHead + await read(handlerPath),
            stdPath.resolve(buildDirLocation, `${member.name}_handler.js`))

        return member.name;
    }));

    const webpackStats = await executeWebpack(normalizedMembers, buildDirLocation);
    const erroredBuilds = webpackStats.filter(stat => stat.compilation.errors.length > 0);
    if (erroredBuilds.length > 0) {
        console.log(erroredBuilds.map(stat => stat.compilation.errors));
        throw new Error('Webpack failures');
    }

    return Promise.all(members.map(async member => {
        const zipFilePath = await zip(
            stdPath.resolve(buildDirLocation, `${member.name}_bundle.js`),
            `${member.name}_bundle.zip`);
        return new PackedMember(
            member.streams,
            zipFilePath,
            member.name)
    }));

}

interface ChainInstruction {
    variableName: string,
    invokeAsMiddleWare: boolean
}

function dumpChain (links: CallableFile[]): ChainInstruction[] {
    return links.map(link => {
        return {
            variableName: `local_${link.name}`,
            invokeAsMiddleWare: link.isMiddleware
        };
    })
}

async function normalize (link: Callable, buildDirLocation: string): Promise<CallableFile> {
    return CallableWriterFactory.get(link).write(buildDirLocation);
}

async function executeWebpack (normalizedMembers: string[], buildDirLocation: string): Promise<any[]> {
    return Promise.all(normalizedMembers.map(async memberName => {
        const handler = stdPath.resolve(buildDirLocation, `${memberName}_handler.js`);
        // Webpack is executed in parallel for each entry (instead of using multiple entries)
        // because the module replacement plugin does not know what entry point included the file
        // in which we're replacing 'fnpack' with the handler (which is the entry point)
        //
        // TODO: use ignore plugin for aws-sdk based on provider (aws-sdk is there-in-the-air on Lambda)
        return new Promise(function(resolve, reject) {
            webpack({
                entry: handler,
                target: 'node',
                output: {
                    filename: `${memberName}_bundle.js`,
                    path: buildDirLocation,
                    libraryTarget: 'umd'
                },
                plugins: [
                    new webpack.NormalModuleReplacementPlugin(
                        /^fnpack$/,
                        handler
                      )
                ]
            }).run((err, stats) => {
                if (err) reject(err);
                resolve(stats);
            });
        })
    }));
}
