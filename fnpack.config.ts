import { file } from "./fnpack/loaders/file";
import { js } from "./fnpack/loaders/js";
import { Http } from "./fnpack/std/Http";

export const bundle = [
    Http.get('/').serve(file('./index.html')),
    // Http.get('/hw').serve("Hello world!"),
    // Http.get('/api/hw').call(js('./hw.js'))
];
