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
                name: this.provider
            },
            package: {
                individually: true
            }
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

function mergeObjects (L: Object, R: Object, replacements: {[key:string]: string}): Object {
    Object.keys(R)
        .forEach(rKey => {
            const assignKey = replacements[rKey] || rKey;
            if (L[rKey] === undefined) {
                L[rKey] = R[rKey];
            } else {
                if (typeof L[rKey] === 'object') {
                    L[assignKey] = mergeObjects(L[rKey], R[rKey], replacements);
                } else if (Array.isArray(L[rKey])) {
                    L[assignKey] = L[rKey].concat(R[rKey]);
                } else {
                    L[assignKey] = R[rKey];
                }
            }
            if (assignKey !== rKey) {
                delete L[rKey];
            }
        });
    return L;
}
