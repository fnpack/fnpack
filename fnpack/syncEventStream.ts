import { CallableArtifact } from './callableArtifact.ts'
import { FileArtifact } from './fileArtifact.ts'
import { Member } from './fnpack.ts'
import { nameHash } from '../util/hashing.ts'

export abstract class SyncEventStream {
    public call (artifact: CallableArtifact|Function): Member {
        const a: CallableArtifact = typeof artifact === 'function'
            ? createCallable(artifact)
            : artifact;
        return {
            stream: this,
            artifact: a,
            name: a.name
        };
    }

    public serve (artifact: string | FileArtifact): Member {
        const a = typeof artifact === 'string'
            ? createFileFromText(artifact)
            : artifact;
        return {
            stream: this,
            artifact: a,
            name: a.name
        };
    }
}

function createFileFromText (text: string): FileArtifact {
    const name = `anonText#${nameHash(text)}`;
    return {
        get: async function (): Promise<Deno.Buffer> {
            const encoder = new TextEncoder();
            const data = await encoder.encode(text);
            const b = new Deno.Buffer();
            await b.write(data);
            return b;
        },
        extname: '.txt',
        name: name
    }
}

function createCallable (fn: Function): CallableArtifact {
    throw new Error('Inline lambdas not supported yet.');
}
