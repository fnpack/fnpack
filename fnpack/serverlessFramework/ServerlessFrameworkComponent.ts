import { basename, extname } from 'path';

export abstract class ServerlessFrameworkComponent {
    abstract getFragment (): Object;
}

export class BaseComponent extends ServerlessFrameworkComponent {
    constructor(private serviceName: string, private provider: string = 'aws'){ super(); }
    getFragment(): Object {
        return {
            service: this.serviceName,
            provider: {
                name: this.provider,
                runtime: 'nodejs10.x'
            },
            package: {
                individually: true
            },
            plugins: [
                'serverless-offline'
            ]
        }
    }
}

export class FunctionComponent extends ServerlessFrameworkComponent {
    private handlerValue: string;
    constructor(private bundlePath: string, handlerName: string = 'handler') {
        super();
        this.handlerValue = `${basename(bundlePath, extname(bundlePath))}.${handlerName}`;
    }

    getFragment(): Object {
        return {
            'functions': {
                '$target': {
                    'handler': this.handlerValue,
                    package: { artifact: basename(this.bundlePath) }
                }
            }
        }
    }
}

export function mergeComponents (
    L: ServerlessFrameworkComponent,
    R: ServerlessFrameworkComponent,
    replacements: {[key:string]: string}): ServerlessFrameworkComponent {
    const merged = mergeObjects(L.getFragment(), R.getFragment(), replacements);
    return {
        getFragment: function (): Object {
            return merged
        }
    };
}

export function mergeObjects (L: any, R: any, replacements: {[key:string]: string}): Object {
    if (Array.isArray(L)) {
        return L.concat(R);
    }
    if (typeof L === 'object') {
        const merged = {};
        Object.keys(L).forEach(lKey => {
            const assignKey = replacements[lKey] || lKey;
            if (R[lKey] === undefined) {
                merged[assignKey] = L[lKey];
            } else {
                merged[assignKey] = mergeObjects(L[lKey], R[lKey], replacements)
            }
        })
        Object.keys(R).forEach(rKey => {
            const assignKey = replacements[rKey] || rKey;
            if (L[assignKey] === undefined && L[rKey] === undefined) {
                merged[assignKey] = R[rKey];
            } else if (L[rKey] === undefined) {
                merged[assignKey] = mergeObjects(L[assignKey], R[rKey], replacements);
            }
        })
        return merged;
    } else {
        return R;
    }
}
