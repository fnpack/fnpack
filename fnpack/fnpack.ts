import { EventStream } from './eventStream';
import { CallChain } from './callChain';

export interface scope {
    members: Member[];
}

export interface Member {
    stream: EventStream
    chain: CallChain
}
