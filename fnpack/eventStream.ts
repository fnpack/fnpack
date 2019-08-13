import { ServerlessFrameworkComponent } from './serverlessFramework/ServerlessFrameworkComponent'
import { CallableFile } from './callChain'
import { Member } from './fnpack'

export abstract class EventStream extends ServerlessFrameworkComponent {
    abstract call(callable: CallableFile|Function): Member
}
