import { Lambda, CallChain } from "../callChain";

export function fn (fn: Function, isMiddleware: boolean = false): CallChain {
    return new CallChain([new Lambda(fn, isMiddleware)]);
}