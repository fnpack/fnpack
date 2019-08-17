import { Lambda, CallChain } from './callChain'
import { Member } from './fnpack'
import { EventStream } from './eventStream'

export abstract class AsyncEventStream extends EventStream {
    public call (callable: CallChain|Function): Member {
        const rightHandChain: CallChain = typeof callable === 'function'
            ? new CallChain([new Lambda(callable)])
            : callable;
        const receptionChain = this.getReceptionChain();
        const joinedChain = receptionChain.concat(rightHandChain);
        joinedChain.offset = receptionChain.links.length;
        return new Member(this, joinedChain);
    }

    protected getReceptionChain(): CallChain {
        return new CallChain([]);
    }
    abstract getFragment(): Object;
}
