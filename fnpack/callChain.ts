export interface Callable {
    //todo: generics / argument types
    // getBuffer: (scopeInformation: any) => Promise<Deno.Buffer>;
    // declarationInformation?: any;
}

export interface CodeCallable {
    runtime: string;
    isMiddleware: boolean;
}

export interface FileDeclarationInformation {
    ext: string;
}

export class StaticFile implements Callable {
    public declarationInformation: FileDeclarationInformation;
    constructor(private path: string) {
        // this.declarationInformation = {
        //     ext: denoPath.extname(path)
        // }
    }
    // getBuffer(): Promise<Deno.Buffer> {
    //     throw new Error('cant open files yet')
    //     // return Deno.open(this.path);
    // }
}

export class Constant implements Callable {
    public declarationInformation: FileDeclarationInformation;
    constructor (private value: any) {
        this.declarationInformation = {
            ext: '.txt'
        }
    }
    // async getBuffer(): Promise<Deno.Buffer> {
    //     const encoder = new TextEncoder();
    //     const data = await encoder.encode(this.value);
    //     const b = new Deno.Buffer();
    //     await b.write(data);
    //     return b;
    // }
}

export class Lambda implements Callable, CodeCallable {
    constructor (private lambda: Function, public isMiddleware: boolean = false) {}
    runtime: string = 'js';
    // getBuffer(scope: any): Promise<Deno.Buffer> {
    //     //todo: create a buffer that calls this.lambda
    //     throw new Error('Inline lambdas not supported yet!');
    // }
}

export class CallableFile implements Callable, CodeCallable {
    constructor (
        private path: string,
        public runtime: string,
        public isMiddleware: boolean = false) {}
    // getBuffer(): Promise<Deno.Buffer> {
    //     throw new Error('Callable files not supported yet!');
    // }
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
