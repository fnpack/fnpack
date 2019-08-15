import { CallableFile, CallChain } from "../callChain";

export function js (path: string, exportName: string = 'default', isMiddleware: boolean = false): CallChain {
    return new CallChain([new CallableFile(path, 'js', exportName, isMiddleware)]);
}