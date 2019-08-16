import { ServiceBundle } from "../fnpack/fnpack"
import * as stdPath from 'path';
import { writeTo, rmGlob } from '../util/fileUtils';
import { gen } from './codeGen';
import { safeDump } from 'js-yaml';
import { packMembers } from './packaging/package'
import { zip } from '../util/zip'
import { collapse } from './colocation/collapse'
import { remove, mkdir, exists } from 'fs-extra'
const buildDirName = '.fnpack';
const globalBuildDir = stdPath.resolve(process.cwd(), buildDirName);

export async function compile (bundle: ServiceBundle): Promise<string> {
    await createBuildDir(globalBuildDir);
    const packed = await packMembers(await collapse(bundle.members, globalBuildDir), globalBuildDir);
    //remove everything that's not a .zip file
    await rmGlob(globalBuildDir, /^.*\.(?!zip$)[^.]+$/gi);
    const sfString = safeDump(gen(packed, bundle.name));
    await writeTo(sfString, stdPath.resolve(globalBuildDir, 'serverless.yaml'));
    return zip(globalBuildDir, `${bundle.name}.zip`);
}

async function createBuildDir(buildDirLocation: string): Promise<void> {
    if (await exists(buildDirLocation)) {
        await (remove(buildDirLocation));
    }
    await mkdir(buildDirLocation);
}
