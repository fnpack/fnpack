import { ServerlessFrameworkComponent } from './serverlessFramework/ServerlessFrameworkComponent'
import { CallChain } from './callChain'
import { Member } from './fnpack'

export abstract class EventStream extends ServerlessFrameworkComponent {
    abstract call(chain: CallChain | Function): Member
}
