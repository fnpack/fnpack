
/*
    //ideally, we can detect if this is from the std lib when we use it
    //so we know to scope collapse them onto the scope's infra
    import { Http } from "https://fnpack.app/std/Http.ts";
    import { Cron } from "https://fnpack.app/std/Cron.ts";

    Http.get('./api/test').call(js('./test.js'))
    Http.get('./api/test').call(js('./test.js'))
    Http.get('./').serve(file('./index.html'))
    Http.post('./api/test2)
        .pipe(js('./postTestStepOne.js'))
        .call(js('./postTestStepTwo.js'))

    Cron.interval('****5').call(js('./timing.js'))

    define('myName').call(foo => `hello world from ${new Date()}`)


    // Async and Sync event sources


    "when" is overloaded to take a sync and async event source
    whatever when returns has the call and serve methods
    call takes a callableArtifact
    serve takes a static resource

    When returns a dispatch member
    define (or when string) returns a named member

*/

/*
define a scope tree;
{
    foo: {
        members: {
            anon#0912830812: {},
            foo: {}
        },
        scopes: {}
    }
}


Scopes
*/