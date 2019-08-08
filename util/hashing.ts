import { createHash } from 'crypto'

//Not meant to be cryptographically secure!
export function nameHash (thing: string | Object, length: number = 8):string {
    if (typeof thing !== 'string') {
        thing = JSON.stringify(thing);
    }
    return createHash('md5')
        .update(thing as string)
        .digest('hex')
        .substr(0, length);
} 