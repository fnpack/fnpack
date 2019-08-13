// import { file } from "./fnpack/loaders/file";
// import { js } from "./fnpack/loaders/js";
// import { Http } from "./fnpack/std/Http";
import { Time } from './fnpack/std/Time'

export const bundle = [
    // Http.get('/').serve(file('./site.html')),
    // Http.get('/hw').serve("Hello world!"),
    // Http.get('/api/hw').call(js('./hw.js')),
    // Http.get('/api/lambda').call(() => {
    //     return {
    //         body: `Hello from a lambda at time ${new Date()}`
    //     }
    // })
    Time.interval('*/5 * * * ? *').call(() => console.log('foo'))
];
