exports.handler = async function (event, context) {
    //todo: errors
    const chain = electChain(event);
    if (chain === undefined) {
        throw new Error('Could not identify chain for event');
    }
    return zipChain(chain)(event);
}

exports.resolver = function (chainName) {
    if (chains[chainName] !== undefined) {
        return zipChain(chains[chainName]);
    }
    throw new Error(`Could not resolve call chain named ${chainName}.`)
}

function electChain (event) {
    let targetChainName, i = 0;
    for(; i < tests.length; i++) {
        targetChainName = tests[i](event);
        if (typeof targetChainName === 'string') {
            return chains[targetChainName];
        }
    }
}

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
