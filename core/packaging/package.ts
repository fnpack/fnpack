import { Member } from '../../fnpack/fnpack'
import { PackedMember } from './packedMember'
import { CallableFile, Callable } from "../../fnpack/callChain";
import { CallableWriterFactory } from '../callables/callableWriter';
import { EventStream } from '../../fnpack/eventStream';
import * as stdPath from 'path';
const handlerPath = stdPath.resolve(__dirname, '../runtime/handler.js');
import { writeTo, read } from '../../util/fileUtils';
import { nameHash } from '../../util/hashing';
import { zip } from '../../util/zip';
import { remove, mkdir, exists } from 'fs-extra'
//this is only happy if we require webpack
const webpack = require('webpack');

export async function packMembers (members: Member[], buildDirLocation: string): Promise<PackedMember[]> {
    await createBuildDir(buildDirLocation);

    const normalizedMembers: string[] = await Promise.all(members.map(async member => {
        const normalizedLinks: CallableFile[] = await Promise.all(member.chain.links
            .map(link => normalize(link, buildDirLocation)));
        const name: string = member.chain.name
            ? member.chain.name
            : generateName(member.stream, normalizedLinks);
        member.chain.name = name;
        
        const importHead = 
            'const environment = {' +
                normalizedLinks
                    .map(file => `local_${file.name}: require('${file.path}').${file.exportName}`)
                    .join(',\n')
            + '\n}\n' + `const callChain = JSON.parse('${JSON.stringify(dumpChain(normalizedLinks))}')` + '\n';

        await writeTo(
            importHead + await read(handlerPath),
            stdPath.resolve(buildDirLocation, `${name}_handler.js`));

        return name;
    }));

    const webpackStats = await executeWebpack(normalizedMembers, buildDirLocation);
    const erroredBuilds = webpackStats.filter(stat => stat.compilation.errors.length > 0);
    if (erroredBuilds.length > 0) {
        console.log(erroredBuilds.map(stat => stat.compilation.errors));
        throw new Error('Webpack failures');
    }

    return Promise.all(members.map(async member => {
        const zipFilePath = await zip(
            stdPath.resolve(buildDirLocation, `${member.chain.name}_bundle.js`),
            `${member.chain.name}_bundle.zip`);
        return new PackedMember(
            member.stream,
            zipFilePath,
            member.chain.name)
    }));

}

//todo: is this bulletproof?
function generateName(stream: EventStream, links: CallableFile[]): string {
    return `anonMember${nameHash({
        stream: stream,
        links: links.map(link => link.path)
    })}`;
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

async function executeWebpack (normalizedMembers: string[], buildDirLocation: string): Promise<any[]> {
    return Promise.all(normalizedMembers.map(async memberName => {
        const handler = stdPath.resolve(buildDirLocation, `${memberName}_handler.js`);
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
