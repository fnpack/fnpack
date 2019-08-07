import { CallableFile, Lambda, Constant, StaticFile, SyncCallChain } from './callChain.ts'
import { Member } from './fnpack.ts'
import { ServerlessFrameworkComponent } from './serverlessFramework/ServerlessFrameworkComponent.ts'

export abstract class SyncEventStream extends ServerlessFrameworkComponent {
    public call (callable: CallableFile|Function): Member {
        const rightHandChain: SyncCallChain = typeof callable === 'function'
            ? new SyncCallChain([new Lambda(callable)])
            : new SyncCallChain([callable]);
        return {
            stream: this,
            chain: this.getReceptionChain().concat(rightHandChain)
        };
    }

    public serve (callable: string|StaticFile): Member {
        const rightHandChain: SyncCallChain = typeof callable === 'string'
            ? new SyncCallChain([new Constant(callable)])
            : new SyncCallChain([callable]);
        return {
            stream: this,
            chain: this.getReceptionChain().concat(rightHandChain)
        };
    }

    protected abstract getReceptionChain(): SyncCallChain;
}
