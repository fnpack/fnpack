import { CallableFile, Lambda, AsyncCallChain } from './callChain'
import { Member } from './fnpack'
import { EventStream } from './eventStream'

export abstract class AsyncEventStream extends EventStream {
    public call (callable: CallableFile|Function): Member {
        const rightHandChain: AsyncCallChain = typeof callable === 'function'
            ? new AsyncCallChain([new Lambda(callable)])
            : new AsyncCallChain([callable]);
        return {
            stream: this,
            chain: this.getReceptionChain().concat(rightHandChain)
        };
    }

    protected getReceptionChain(): AsyncCallChain {
        return new AsyncCallChain([]);
    }
    abstract getFragment(): Object;
}
