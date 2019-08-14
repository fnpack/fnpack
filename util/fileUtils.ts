import { isAbsolute, resolve } from "path"
import { outputFile, readFile, readdir, remove } from 'fs-extra'

export function ensureAbsolute(path: string, wouldBeRelativeTo: string): string {
    if (isAbsolute(path)) {
        return path;
    }
    return resolve(wouldBeRelativeTo, path);
}

export async function ls (directoryPath: string): Promise<string[]> {
    return readdir(directoryPath);
}

export async function rmGlob (directoryPath: string, regex: RegExp): Promise<void> {
    const files = await ls(directoryPath);
    await Promise.all(files.map(async file => {
        if (file.match(regex)) {
            await remove(resolve(directoryPath, file))
        }
    }))
}

export function writeTo (contents: string, path: string): Promise<void> {
    return outputFile(path, contents);
}

export function read (path: string): Promise<string> {
    return readFile(path);
}