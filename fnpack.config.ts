import { scope } from "./fnpack.ts";
import { file } from "./loaders.ts";
import { Http } from "./Http.ts";

export const bundle = scope([
    Http.get('/').serve(file('./index.html'))
]);
