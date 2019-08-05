import { FileArtifact } from "./fnpack.ts"
import * as denoPath from "https://deno.land/std/fs/path.ts";

export function file (path: string): FileArtifact {
    return {
        get: async ():Promise<Deno.File> =>  {
            return Deno.open(path);
        },
        basename: denoPath.basename(path),
        extname: denoPath.extname(path)
    };
}
