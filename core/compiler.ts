import { ServiceBundle } from "../fnpack/fnpack"
import * as stdPath from 'path';
import { writeTo, rmGlob } from '../util/fileUtils';
import { gen } from './codeGen';
import { safeDump } from 'js-yaml';
import { packMembers } from './packaging/package'
import { zip } from '../util/zip'
const buildDirName = '.fnpack';
const globalBuildDir = stdPath.resolve(process.cwd(), buildDirName);

export async function compile (bundle: ServiceBundle): Promise<string> {
    const packed = await packMembers(bundle.members, globalBuildDir);
    //remove everything that's not a .zip file
    await rmGlob(globalBuildDir, /^.*\.(?!zip$)[^.]+$/gi);
    const sfString = safeDump(gen(packed, bundle.name));
    await writeTo(sfString, stdPath.resolve(globalBuildDir, 'serverless.yaml'));
    return zip(globalBuildDir, `${bundle.name}.zip`);
}
