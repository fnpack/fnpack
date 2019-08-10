import { SyncEventStream } from "../syncEventStream";
import { SyncCallChain } from '../callChain';
import { js } from '../loaders/js'
import { resolve } from 'path'

export interface HttpFilter {
    method: 'get'|'put'|'post'|'delete',
    path: String
}

export class Http extends SyncEventStream {
    constructor(filter: HttpFilter) {
        super();
        this.filter = filter;
    }

    protected getReceptionChain (): SyncCallChain {
        return new SyncCallChain([
            js(resolve(__dirname, './httpReception.js'), 'http', true)
        ])
    }

    private filter: HttpFilter;

    static get (path: String): SyncEventStream {
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

//todo: use this
const typeMap = {
    '.js': 'application/javascript',
    '.html': 'text/html'
}
