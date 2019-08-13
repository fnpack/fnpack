import { nameHash } from '../util/hashing'

export interface Callable {
    type: string;
}

export interface CodeCallable {
    runtime: string;
    isMiddleware: boolean;
}

export interface FileDeclarationInformation {
    ext: string;
}

export class StaticFile implements Callable {
    type = 'staticFile';
    public declarationInformation: FileDeclarationInformation;
    constructor(private path: string) {}
}

export class Constant implements Callable {
    type = 'constant';
    public declarationInformation: FileDeclarationInformation;
    constructor (public value: any) {
        this.declarationInformation = {
            ext: '.txt'
        }
    }
}

export class Lambda implements Callable, CodeCallable {
    type = 'lambda';
    runtime: string = 'js';
    constructor (public lambda: Function, public isMiddleware: boolean = false) {}
}

export class CallableFile implements Callable, CodeCallable {
    type = 'callableFile';
    name: string;
    constructor (
        public path: string,
        public runtime: string,
        public exportName: string = 'default',
        public isMiddleware: boolean = false) {
            this.name = nameHash(path);
        }
}

export interface CallChain {
    links: Callable[]
}

export class SyncCallChain implements CallChain {
    links: Callable[] = [];

    constructor(links: Callable[]) {
        this.links = links;
    }

    concat (rightChain: SyncCallChain): SyncCallChain {
        this.links = this.links.concat(rightChain.links);
        return this;
    }
}

//todo: reduce this with generics
export class AsyncCallChain implements CallChain {
    links: Callable[] = [];

    constructor(links: Callable[]) {
        this.links = links;
    }

    concat (rightChain: AsyncCallChain): AsyncCallChain {
        this.links = this.links.concat(rightChain.links);
        return this;
    }
}
