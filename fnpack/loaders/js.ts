import { CallableArtifact } from "../callableArtifact.ts";

//todo
export function js (path: string): CallableArtifact<any, any> {
    return {
        name: path,
        runtime: 'js'
    };
}