import { ServerlessFrameworkComponent } from './serverlessFramework/ServerlessFrameworkComponent'
import { CallChain } from './callChain'
import { Member } from './fnpack'

export abstract class EventStream extends ServerlessFrameworkComponent {
    abstract call(chain: CallChain | Function): Member
}


// Tells the compiler that this event source can be co-located onto
// a lambda function with other event sources.  The test and getConfig
// functions are used to determine if an event came from the infrastructure
// this event source configured.
export interface Colocatable {
    colocationTest: {
        // test will be called at RUN time, so it can't depend on any state
        test: (event: any, config: any) => boolean,
        // getConfig will be called at COMPILE time, so it can depend on state
        getConfig: () => any
    }
}
