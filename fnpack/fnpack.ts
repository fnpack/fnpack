import { EventStream } from './eventStream';
import { CallChain } from './callChain';

export interface ServiceBundle {
    name: string,
    members: Member[]
}

export class Member {
    constructor(public stream: EventStream, public chain: CallChain) {};

    as (name: string): Member {
        this.chain = this.chain.as(name);
        return this;
    }
}
