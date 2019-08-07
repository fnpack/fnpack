import { file } from "./fnpack/loaders/file.ts";
import { js } from "./fnpack/loaders/js.ts";
import { Http } from "./fnpack/std/Http.ts";

export const bundle = [
    Http.get('/').serve(file('./index.html')),
    Http.get('/hw').serve("Hello world!"),
    Http.get('/api/hw').call(js('./hw.js'))
];
