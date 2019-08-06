import { CallableArtifact } from './callableArtifact.ts'
import { FileArtifact } from './fileArtifact.ts'
import { Member } from './fnpack.ts'
import { nameHash } from '../util/hashing.ts'
import { ServerlessFrameworkComponent } from './serverlessFramework/ServerlessFrameworkComponent.ts'

export abstract class SyncEventStream<Input, Output> extends ServerlessFrameworkComponent {
    public call (artifact: CallableArtifact<Input, Output>|Function): Member {
        const a: CallableArtifact<Input, Output> = typeof artifact === 'function'
            ? this.createCallable(artifact)
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

    protected createCallable (fn: Function): CallableArtifact<Input, Output> {
        throw new Error('Inline lambdas not supported yet.');
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


