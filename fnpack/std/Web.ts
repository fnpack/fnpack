import { HttpFilter } from './Http'
import { Http } from './Http'
import { CallChain } from '../callChain'
import { fn } from '../loaders/fn'

export class Web extends Http {
    constructor(filter: HttpFilter) {
        super(filter);
    }

    getReceptionChain(): CallChain {
        return super.getReceptionChain().concat(fn(async (req, next) => {
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
        return new Web(Http.get(path).filter);
    }
}