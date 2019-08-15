import { Lambda, Constant, StaticFile, CallChain } from './callChain'
import { Member } from './fnpack'
import { EventStream } from './eventStream'

export abstract class SyncEventStream extends EventStream {
    public call (callable: CallChain|Function): Member {
        const rightHandChain: CallChain = typeof callable === 'function'
            ? new CallChain([new Lambda(callable)])
            : callable;
        return new Member(this, this.getReceptionChain().concat(rightHandChain));
    }

    public serve (callable: string|StaticFile): Member {
        const rightHandChain: CallChain = typeof callable === 'string'
            ? new CallChain([new Constant(callable)])
            : new CallChain([callable]);
        return new Member(this, this.getReceptionChain().concat(rightHandChain));
    }

    protected abstract getReceptionChain(): CallChain;
    abstract getFragment(): Object;
}
