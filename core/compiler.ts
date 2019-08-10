import { Member } from "../fnpack/fnpack"
import { remove, mkdir, exists } from 'fs-extra'
import * as stdPath from 'path';
import { CallableFile, Callable } from "../fnpack/callChain";
import { CallableWriterFactory } from './callables/callableWriter';
import { writeTo, read } from '../util/fileUtils';
import { gen } from '../backend/codeGen';
import { PackedMember } from './packedMember';
import { safeDump } from 'js-yaml';
//this is only happy if we require webpack
const webpack = require('webpack');
const buildDirName = '.fnpack';
const globalBuildDir = stdPath.resolve(process.cwd(), buildDirName);
const handlerPath = stdPath.resolve(__dirname, './runtime/handler.js');

export async function compile (bundle: Member[]): Promise<string> {
    //todo: create build dirs for each member
    const packed = await packMember(bundle[0], globalBuildDir);
    
    const sfObject = gen([packed]);

    const sfString = safeDump(sfObject);
    await writeTo(sfString, stdPath.resolve(globalBuildDir, 'serverless.yaml'));

    return 'foo'
}

async function packMember (member: Member, buildDirLocation: string): Promise<PackedMember> {
    await createBuildDir(buildDirLocation);
    const normalizedLinks: CallableFile[] = await Promise.all(member.chain.links
        .map(link => normalize(link, buildDirLocation)));

    const importHead = 
        'const environment = {' +
            normalizedLinks
                .map(file => `local_${file.name}: require('${file.path}').${file.exportName}`)
                .join(',\n')
        + '\n}\n' + `const callChain = JSON.parse('${JSON.stringify(dumpChain(normalizedLinks))}')` + '\n';

    await writeTo(importHead + await read(handlerPath), stdPath.resolve(buildDirLocation, 'handler.js'));
    
    //at this point, we've created the executable call chain
    //todo: do something with webpack stats
    const webpackStats = await executeWebpack(buildDirLocation);
    if (webpackStats.compilation.errors.length > 0) {
        console.log(webpackStats.compilation.errors);
        throw new Error('Webpack failure');
    }

    return new PackedMember(member.stream, stdPath.resolve(buildDirLocation, 'handlerBundle.js'));
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

async function createBuildDir(buildDirLocation: string): Promise<void> {
    if (await exists(buildDirLocation)) {
        await (remove(buildDirLocation));
    }
    await mkdir(buildDirLocation);
}

async function executeWebpack (buildDirLocation: string): Promise<any> {
    return new Promise(function (resolve, reject) {
        webpack({
            entry: stdPath.resolve(buildDirLocation, 'handler.js'),
            target: 'node',
            output: {
                filename: 'handlerBundle.js',
                path: buildDirLocation,
                libraryTarget: 'umd'
            }
        }).run((err, stats) => {
            if (err) reject(err);
            resolve(stats);
        });
    });
}
