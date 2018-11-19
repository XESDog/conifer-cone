/**
 * Created by work on 2017/3/22.
 */


function throwMissingParameterError() {
    throw new Error('Missing parameter!');
}

function throwArgumentsNumberInvalidError() {
    throw new Error('arguments number invalid')
}

export {throwMissingParameterError, throwArgumentsNumberInvalidError}