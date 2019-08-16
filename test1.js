import { resolver } from 'fnpack';

export default async function foo () {
    return resolver('thing')
}