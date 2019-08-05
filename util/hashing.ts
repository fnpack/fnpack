
//todo use crypto
export function nameHash (thing: string | Object):string {
    if (typeof thing === 'string') {
        return 'foo';
    } else {
        return 'bar';
    }
} 