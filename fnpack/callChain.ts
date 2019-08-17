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

export class CallChain {
    public offset: number = 0;
    constructor(public links: Callable[], public name: string = undefined) {}

    as (name: string): CallChain {
        this.name = name;
        return this;
    }

    concat (chain: CallChain): CallChain {
        this.links = this.links.concat(chain.links);
        if (chain.name !== undefined) {
            this.name = chain.name;
        }
        return this;
    }
}
