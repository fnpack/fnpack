import { file } from "./fnpack/loaders/file";
import { js } from "./fnpack/loaders/js";
import { fn } from './fnpack/loaders/fn';
import { ServiceBundle } from './fnpack/fnpack';
import { Http } from "./fnpack/std/Http";
import { Web } from "./fnpack/std/Web";
import { Time } from './fnpack/std/Time'


// export const bundle: ServiceBundle = {
//     name: 'testerino',
//     members: [
//         // Http.get('/').serve(file('./site.html')),
//         // Http.get('/hw').serve("Hello world!"),
//         // Http.get('/api/hw').call(js('./hw.js')),
//         Http.get('/api/lambda').call(() => {
//             return {
//                 body: `Hello ${new Date()}, this is the future talking`
//             }
//         }),
        // Time.interval('*/5 * * * ? *')
        //     .call(() => console.log('foobar')).as('mything')
//     ]
// };

// const id = fn(x => x).as('identity')

// export const bundle: ServiceBundle = {
//     name: 'resolver',
//     members: [
//         Http.get('/').call(id),
//         Http.get('/constant').call(() => {return {body: 'blah'}})
//     ]
// }

// export const bundle: ServiceBundle = {
//     name: 'resolver',
//     members: [
//         Web.get('/').call(js('./test1.js'))
//     ]
// }

export const bundle: ServiceBundle = {
    name: 'resolver',
    members: [
        Web.get('/').call(fn(async () => {
            return 'foo'
        })),
        Time.interval('*/5 * * * ? *')
            .call(() => console.log('foobar')).as('mything')
    ]
}
