import { EventStream } from './eventStream';
import { CallChain } from './callChain';

export interface scope {
    members: Member[];
}

export interface ServiceBundle {
    name: string,
    members: Member[]
}

export interface Member {
    //A piece of infrastructure that produces events
    stream: EventStream

    //What gets executed when an event from the event stream happens
    chain: CallChain,

    //The name of the member; this will usually end up being part of the function name
    //If null, a name will be generated as a content-based hash of the call chain
    name?: string,

    //Names the member (overriding names that may have been generated)
    as: (name: string) => Member
}

export function createMember(stream: EventStream, chain: CallChain): Member {
    const m = {
        stream: stream,
        chain: chain
    };
    const as = (name: string): Member => {
        return {
            name: name,
            as: as,
            ...m
        }
    }
    return as(undefined);
}
