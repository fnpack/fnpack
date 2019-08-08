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
    constructor (private value: any) {
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
    constructor (
        public path: string,
        public runtime: string,
        public isMiddleware: boolean = false) {}
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
