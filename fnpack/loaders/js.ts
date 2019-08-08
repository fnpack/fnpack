import { CallableFile } from "../callChain";

export function js (path: string, exportName: string = 'default', isMiddleware: boolean = false): CallableFile {
    return new CallableFile(path, 'js', exportName, isMiddleware);
}