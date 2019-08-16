import { SyncEventStream } from '../syncEventStream'
import { Http } from './Http'
import { CallChain } from '../callChain'
import { fn } from '../loaders/fn'

export class Web extends SyncEventStream {
    constructor(private http: Http) {
        super();
    }

    getReceptionChain(): CallChain {
        return this.http.getReceptionChain().concat(fn(async (req, next) => {
            try {
                const res = await next(req.body);
                return {
                    body: res,
                    status: 200
                };
            } catch(e) {
                return {
                    body: e,
                    status: 500
                }
            }
        }, true));
    }

    static get(path: string): Web {
        return new Web(Http.get(path));
    }

    getFragment() {
        return this.http.getFragment();
    }
}