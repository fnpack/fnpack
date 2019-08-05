export interface scope {
    members: Member[];
}
export interface Member {
    
}
export interface Bundle {}

export abstract class SyncEventStream {
    public call: (callableArtifact: CallableArtifact) => Member;

    public serve (file: FileArtifact): Member {
        return {
            stream: this,
            artifact: file
        };
    }
}

interface CallableArtifact {};

export interface FileArtifact {
    get: () => Promise<Deno.File>,
    basename: String,
    extname: String
};

export const scope = (members: Member[]):Bundle =>  {
    return members;
}