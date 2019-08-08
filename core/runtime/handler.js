import { $userEntry } from "$userPath";

module.exports = {
    handler: function (event, context, callback) {
        try {
            const maybePromise = $userEntry(event);
            if (maybePromise !== undefined && typeof maybePromise.then === 'function') {
                maybePromise
                    .then(result => callback(null, result))
                    .catch(userException => callback(userException));
            } else {
                callback(null, maybePromise);
            }
        } catch (exception) {
            callback(exception);
        }
    }
};
