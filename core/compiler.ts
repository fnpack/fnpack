import { Member } from "../fnpack/fnpack"
import { remove, mkdir, exists } from 'fs-extra'
import * as stdPath from 'path';
import { CallableFile, Callable } from "../fnpack/callChain";
import { CallableWriterFactory } from './callables/callableWriter';
const buildDirName = '.fnpack';
const buildDirLocation = stdPath.resolve(process.cwd(), buildDirName);

export async function compile (bundle: Member[]): Promise<string> {
    await createBuildDir();
    const first: Member = bundle[0];
    //todo: check if this is async
    //we'll take the call chains and flatten them into single bundles within our build dir
    const normalizedLinks: CallableFile[] = await Promise.all(first.chain.links.map(normalize));
    console.log(normalizedLinks)
    

    return 'foo'
}

async function normalize (link: Callable): Promise<CallableFile> {
    return CallableWriterFactory.get(link).write(buildDirLocation);
}

async function createBuildDir(): Promise<void> {
    if (await exists(buildDirLocation)) {
        await (remove(buildDirLocation));
    }
    await mkdir(buildDirLocation);
}
