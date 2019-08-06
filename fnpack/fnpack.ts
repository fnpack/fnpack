import { AsyncEventStream } from './asyncEventStream.ts';
import { SyncEventStream } from './syncEventStream.ts';
import { FileArtifact } from './fileArtifact.ts';
import { CallableArtifact } from './callableArtifact.ts';

export interface scope {
    members: Member[];
}

export interface Member {
    stream: AsyncEventStream|SyncEventStream<any, any>,
    artifact: FileArtifact|CallableArtifact<number, any>,
    name: string
}

// export interface Bundle {}

// export const scope = (members: Member[]):Bundle =>  {
//     return members;
// }
