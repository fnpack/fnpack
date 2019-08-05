declare const Deno: any;

export interface FileArtifact {
    get: () => Promise<Deno.Buffer>,
    extname: string,
    name: string
};
