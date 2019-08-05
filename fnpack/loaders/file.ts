declare const Deno: any;

import { FileArtifact } from "../fileArtifact.ts"
import * as denoPath from "https://deno.land/std/fs/path.ts";

export function file (path: string): FileArtifact {
    return {
        get: async ():Promise<Deno.Buffer> =>  {
            return Deno.open(path);
        },
        name: denoPath.basename(path),
        extname: denoPath.extname(path)
    };
}
