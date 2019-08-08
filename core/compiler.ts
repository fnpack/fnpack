import { Member } from "../fnpack/fnpack"
import { remove, mkdir, exists } from 'fs-extra'
import * as stdPath from 'path';
import { CallableFile, Callable } from "../fnpack/callChain";
import { CallableWriterFactory } from './callables/callableWriter';
import { writeTo, read } from '../util/fileUtils';
//this is only happy if we require webpack
const webpack = require('webpack')
const buildDirName = '.fnpack';
const buildDirLocation = stdPath.resolve(process.cwd(), buildDirName);
const handlerPath = stdPath.resolve(__dirname, './runtime/handler.js');

export async function compile (bundle: Member[]): Promise<string> {
    await createBuildDir();
    const first: Member = bundle[0];
    const normalizedLinks: CallableFile[] = await Promise.all(first.chain.links.map(normalize));

    const importHead = 
        'const environment = {' +
            normalizedLinks
                .map(file => `local_${file.name}: require('${file.path}').${file.exportName}`)
                .join(',\n')
        + '\n}\n' + `const callChain = JSON.parse('${JSON.stringify(dumpChain(normalizedLinks))}')` + '\n';

    await writeTo(importHead + await read(handlerPath), stdPath.resolve(buildDirLocation, 'handler.js'));
    const x = await executeWebpack(buildDirLocation);

    // console.log(x)

    return 'foo'
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

async function normalize (link: Callable): Promise<CallableFile> {
    return CallableWriterFactory.get(link).write(buildDirLocation);
}

async function createBuildDir(): Promise<void> {
    if (await exists(buildDirLocation)) {
        await (remove(buildDirLocation));
    }
    await mkdir(buildDirLocation);
}

async function executeWebpack (buildDirLocation: string): Promise<void> {
    return new Promise(function (resolve, reject) {
        webpack({
            entry: stdPath.resolve(__dirname, '../.fnpack/handler.js'),
            target: 'node',
            output: {
                filename: 'handler.bundle.js',
                path: buildDirLocation,
                libraryTarget: 'umd'
            }
        }).run((err, stats) => {
            if (err) reject(err);
            resolve(stats);
        });
    });
}
