import { file } from "./fnpack/loaders/file.ts";
import { Http } from "./fnpack/std/Http.ts";

export const bundle = [
    Http.get('/').serve(file('./index.html')),
    Http.get('/hw').serve("Hello world!")
];
