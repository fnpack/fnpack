import { isAbsolute, resolve } from "path"
import { outputFile, readFile } from 'fs-extra'

export function ensureAbsolute(path: string, wouldBeRelativeTo: string): string {
    if (isAbsolute(path)) {
        return path;
    }
    return resolve(wouldBeRelativeTo, path);
}

export function writeTo (contents: string, path: string): Promise<void> {
    return outputFile(path, contents);
}

export function read (path: string): Promise<string> {
    return readFile(path);
}