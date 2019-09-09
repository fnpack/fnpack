import { file } from "./fnpack/loaders/file";
import { js } from "./fnpack/loaders/js";
import { fn } from './fnpack/loaders/fn';
import { ServiceBundle } from './fnpack/fnpack';
import { Http } from "./fnpack/std/Http";
import { CallChain } from './fnpack/callChain'
import { Web } from "./fnpack/std/Web";
import { Time } from './fnpack/std/Time'


// import { welcomeService } from './userWelcomeService'
// import { Service } from 'fnpack-passport'
// import { DynamoReads } from 'fnpack-dynamo'

// const readStream = new DynamoReads({ table: 'foo' });

// export const bundle {
//     name: "MyService",
//     members: [
//         Service.bundle, //a bundle
//         readStream.call(welcomeService)
//     ]
// }


// import { OAuth } from 'fnpack-oauth';

// const oAuth = new OAuth({ secret: "<<<<>>>>", provider: "google" });
// const authorizer: CallChain = oAuth.authorizer;

// const protect = (callChain: CallChain): CallChain {
//     return authorizer.concat(callChain);
// }

// export const bundle: ServiceBundle = {
//     name: "Auth Protected",
//     members: [
//         Http.get('/authCallback').call(oAuth.callback),
//         Http.get('/api/foo').call(protect(js('fooApi.js')))
//     ]
// }

// export const bundle: ServiceBundle = {
//     name: 'testerino',
//     members: [
//         Http.get('/').serve('./site.html'),
//         Http.get('/hw').serve("Hello world!"),
//         Http.get('/api/hw').call(js('./hw.js')),
//         Http.get('/api/lambda').call(() => {
//             return {
//                 body: `Hello ${new Date()}, this is the future talking`
//             }
//         }),
//         Time.interval('*/5 * * * ? *')
//             .call(() => console.log('foobar')).as('timer')
//     ]
// };

const id = fn(x => x).as('identity')

export const bundle: ServiceBundle = {
    name: 'resolver',
    members: [
        Http.get('/').call(id),
        Http.get('/constant').call(() => {return {body: 'blah'}})
    ]
}

// export const bundle: ServiceBundle = {
//     name: 'resolver',
//     members: [
//         Web.get('/').call(js('./test1.js')).with(DDBWriteTo("foobar"))
//     ]
// }

// export const bundle: ServiceBundle = {
//     name: 'resolver',
//     members: [
//         Web.get('/').call(fn(async () => {
//             return 'foo'
//         })),
//         Time.interval('*/5 * * * ? *')
//             .call(() => console.log('foobar')).as('mything')
//     ]
// }

// export const bundle: ServiceBundle = {
//     name: 'resolver',
//     members: [
//         Web.get('/foo').call(fn(() => 'foo')).as('foo'),
//         Web.get('/fooRemote').call(fn(() => {
//             const { resolver } = require('fnpack');
//             const x = resolver('foo');
//             return x();
//         }))
//     ]
// }
