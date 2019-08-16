import { SyncEventStream } from "../syncEventStream";
import { Colocatable } from '../eventStream'
import { CallChain } from '../callChain';
import { js } from '../loaders/js'
import { resolve } from 'path'

export interface HttpFilter {
    method: 'get'|'put'|'post'|'delete',
    path: String
}

export class Http extends SyncEventStream implements Colocatable {
    constructor(public filter: HttpFilter) {
        super();
    }

    colocationTest = {
        test: (event: any, config: any): boolean => {
            return event.method === config.method
                && event.path === config.path
        },
        getConfig: (): any => this.filter
    }

    getReceptionChain (): CallChain {
        return js(resolve(__dirname, './httpReception.js'), 'http', true);
    }

    static get (path: String): Http {
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
