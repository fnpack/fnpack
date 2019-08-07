import { StaticFile } from "../callChain.ts"

export function file (path: string): StaticFile {
    return new StaticFile(path);
}
