import { CallableFile, Callable, Lambda, StaticFile, Constant } from "../../fnpack/callChain";
import { ensureAbsolute, writeTo } from "../../util/fileUtils";
import { nameHash } from '../../util/hashing'

export interface CallableWriter {
    write: (buildDirectory: string) => Promise<CallableFile>
}

export class CallableWriterFactory {
    static get(callable: Callable): CallableWriter {
        //there has to be a better way to do this...
        switch (callable.type) {
            case 'callableFile':
                return new CallableFileWriter(callable as CallableFile);
            case 'lambda':
                return new LambdaWriter(callable as Lambda)
            case 'constant':
                return new ConstantWriter(callable as Constant)
            case 'staticFile':
                return new StaticWriter(callable as StaticFile)
            default:
                throw new Error(`found non writable callable of type ${callable.type}`)
        }
    }
}

class CallableFileWriter implements CallableWriter {
    constructor(private callable: CallableFile) {}
    async write (buildDirectory: string): Promise<CallableFile> {
        return {
            ...this.callable,
            path: ensureAbsolute(this.callable.path, process.cwd()),
        }
    }
}

class LambdaWriter implements CallableWriter {
    constructor(private lambda: Lambda) {}
    async write (buildDirectory: string): Promise<CallableFile> {
        const lambdaText: string = this.lambda.lambda.toString();
        const location = ensureAbsolute(`lambda#${nameHash(lambdaText)}.js`, buildDirectory);
        await writeTo('exports.default = ' + lambdaText, location);
        return new CallableFile(location, this.lambda.runtime, 'default', this.lambda.isMiddleware);
    }
}

class ConstantWriter implements CallableWriter {
    constructor(private constant: Constant) {}
    async write (buildDirectory: string): Promise<CallableFile> {
        const location = ensureAbsolute(`constant#${nameHash(this.constant.value)}.js`, buildDirectory);
        await writeTo('exports.default = () => ' + this.constant.value, location);
        return new CallableFile(location, '.js');
    }
}

//todo: we might not want to normalize these!
class StaticWriter implements CallableWriter {
    constructor(private file: StaticFile) {}
    async write (buildDirectory: string): Promise<CallableFile> {
        throw new Error('Static files are not implimented yet!');
    }
}

