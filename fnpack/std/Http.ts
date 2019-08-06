import { SyncEventStream } from "../syncEventStream.ts";

export interface HttpRequest {
    method: string,
    path: string,
    body: any
}

export interface HttpResponse {
    headers?: { [key:string]:string },
    body?: any,
    status?: number
}

export class Http extends SyncEventStream<HttpRequest, HttpResponse> {
    constructor(filter: HttpFilter) {
        super();
        this.filter = filter;
    }

    private filter: HttpFilter;

    static get (path: String): SyncEventStream<HttpRequest, HttpResponse> {
        return new Http({ method: 'get', path: path });
    }

    getFragment (): Object {
        return {
            functions: {
                '$target': {
                    'events': [
                        { 'http': this.filter }
                    ]
                }
            }
        }
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
