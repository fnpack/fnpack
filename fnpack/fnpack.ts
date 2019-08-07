import { EventStream } from './eventStream.ts';
import { CallChain } from './callChain.ts';

export interface scope {
    members: Member[];
}

export interface Member {
    stream: EventStream
    chain: CallChain
}
