import { SyncEventStream } from "../syncEventStream.ts";

export class Http extends SyncEventStream {

    constructor(filter: HttpFilter) {
        super();
        this.filter = filter;
    }

    private filter: HttpFilter;

    static get (path: String): SyncEventStream {
        return new Http({ method: 'get', path: path });
    }
}

export interface HttpFilter {
    method: 'get'|'put'|'post'|'delete',
    path: String
}

//todo: use this
const typeMap = {
    '.js': 'application/javascript',
    '.html': 'text/html'
}
