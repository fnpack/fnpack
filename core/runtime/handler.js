exports.handler = async function (event, context) {
    //todo: errors
    return zipChain(callChain)(event);
}

exports.resolver = function (thing) { return thing; }

function zipChain (chain) {
    if (chain.length < 1) {
        return e => e;
    }
    const head = chain[0];
    const rest = chain.slice(1) || [];
    if (head.invokeAsMiddleWare) {
        return event => {
            return environment[head.variableName](event, zipChain(rest))
        }
    }
    return event => {
        return zipChain(rest)(environment[head.variableName](event));
    }
}
