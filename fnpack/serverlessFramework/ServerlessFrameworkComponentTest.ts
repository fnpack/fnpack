import { mergeObjects } from './ServerlessFrameworkComponent';
import { deepEqual } from 'assert'

const simple = {
    a: 1
}

const simple2 = {
    b: 2
}

const array = {
    array: ['foo']
}

const nested = {
    a: { n: ['1'] }
}

const nested2 = {
    a: { n: ['2'] }
}

const complex = {
    a: {
        n: [1],
        m: 'foo',
        next: { other: 'bar' }
    }
}

const complex2 = {
    a: {
        n: [2],
        m: 'thing',
        next: { another: "one"}
    }
}

const replaced = {
    x: [1]
}

const replaced2 = {
    a: [2]
}

const lopsidedReplace = {
    a: [1]
}

const lopsidedReplace2 = {
    b: [2]
}

export const tests = [
    () => deepEqual(mergeObjects(simple, simple, {}), simple),
    () => deepEqual(mergeObjects(simple, simple2, {}), {
        a: 1,
        b: 2
    }),
    () => deepEqual(mergeObjects(simple, array, {}), {
        a: 1,
        array: ['foo']
    }),
    () => deepEqual(mergeObjects(nested, nested2, {}), {a: {n: ['1', '2']}}),
    
    () => deepEqual(mergeObjects(complex, complex2, {a: 'x', other: 'rehto'}), {
        x: {
            n: [1, 2],
            m: 'thing',
            next: {
                rehto: 'bar',
                another: 'one'
            }
        }
    }),
    () => deepEqual(mergeObjects(replaced, replaced2, {a: 'x'}), {x: [1, 2]}),
    () => deepEqual(mergeObjects(nested, nested2, {a: 'x'}), {x: {n: ['1', '2']}}),
    () => deepEqual(mergeObjects(lopsidedReplace, lopsidedReplace2, {b: 'x'}), {a: [1], x: [2]}),
];
