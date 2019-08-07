import { StaticFile } from "../callChain"

export function file (path: string): StaticFile {
    return new StaticFile(path);
}
