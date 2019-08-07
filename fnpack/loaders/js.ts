import { CallableFile } from "../callChain";

export function js (path: string, isMiddleware: boolean = false): CallableFile {
    return new CallableFile(path, 'js', isMiddleware);
}