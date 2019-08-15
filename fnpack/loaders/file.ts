import { CallChain, StaticFile } from "../callChain"

export function file (path: string): CallChain {
    return new CallChain([new StaticFile(path)]);
}
