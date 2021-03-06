var arrayCstrPrefix = 'function Array()';

function isArray(object) {
    return object && 'object' == (typeof object)
        && arrayCstrPrefix == (''+object.constructor).substring(0,arrayCstrPrefix.length);
};

function expectedLength(expectation) {
    if(!isArray(expectation) || expectation.length == 0) {
        return 0;
    }
    var last = expectation[expectation.length - 1];
    if(last && ('object' == typeof last) && 'flags' in last) {
        return expectation.length - 1;
    }
    return expectation.length;
}

function isOptional(expectation) {
    if ('string' == typeof expectation) {
        return ('?' == expectation.charAt(0));
    }
// TODO: It might make sense to consider null or undefined as optional.
//    if (('undefined' == typeof expectation) || null === expectation) {
//        return true;
//    }
    if (isArray(expectation)) {
        return expectation.length == 0 || (function(){
            var last = expectation[expectation.length - 1];
            return last && last.flags && last.flags.optional;
        });
    }
    if ('object' == typeof expectation) {
        return expectation.optional;
    }
}

function format(object) {
     if (isArray(object)) {
         return '[' + object.length +
             ']: [' +
             object.map(function (entry){ return format(entry); }).join(',') +
             ']';
     }
     if ('object' == typeof object && null !== object) {
         return '{' + Object.keys(object).map(function(key){
             return key + ':' + format(object(key));
         }).join(',') + '}';
     }
     if ('undefined' == typeof object) {
         return 'undefined';
     }
     if (null === object) {
         return 'null';
     }
     if ('number' == typeof object) {
         return '' + object;
     }
     if ('string' == typeof object) {
         return '\'' + object +'\'';
     }
     return (typeof object) + ': ' + object;
}

function matchArray(response, expectation, path) {
    if (!isArray(response)) {
       if (('undefined' != typeof response) && null !== response) {
          return path + ': expected ['+response.length+'], got: ' + format(response) + '\n';
       } else if (!isOptional(expectation)) {
          return path + ': expected ['+response.length+'], got undefined\n';
       } else {
          // Missing optional field: not an error
          return '';
       }
    }

    var result = '';
    var expected = expectedLength(expectation);
    if (response.length > expected) {
        result += path + ': expected ' + expected + ', got: ' + response.length + ' elements ('+ format(response) +')\n';
    }
    var limit = expected;
    if (limit > response.length) {
        limit = response.length;
    }
    for (var i=0; i<limit; ++i) {
        result += match(response[i], expectation[i], path + '[' + i + ']');
    }
    for (var i=limit; i<expected; ++i) {
        if (!isOptional(expectation[i])) {
            result += path + '[' + i + ']' + ': expected: ' + expectation + ', got: undefined\n';
        }
    }
    return result;
}

function matchPrimitive(response, expectation, path) {
    var optional = isOptional(expectation);
    if (optional) {
        expectation = expectation.substring(1);
    }
    return (
        (optional && ('undefined' == typeof response || null === response))
        || expectation == (typeof response)
        ? ''
        : path + ': expected: ' + expectation
            + ', got: ' + format(response) + '\n'
    );
}

function match(response, expectation, opt_path) {
    var path = opt_path || '';
    var result = '';
    if (isArray(expectation)) {
        result += matchArray(response, expectation, path);
    } else if ('string' == typeof expectation) {
        result += matchPrimitive(response, expectation, path);
    } else if ('undefined' == typeof expectation) {
        result += ('undefined' == (typeof response) || null === response ? '' : path
        + ': expected: undefined, got: ' + format(response) + '\n');
    } else if ('sequenceOf' in expectation) {
        // NOTE: sequence assumed optional
        if (isArray(response)) {
            for (var i=0; i<response.length; ++i) {
                result += match(response[i], expectation.sequenceOf, path + '[' + i + ']');
            }
        }
    } else {
        result += path + ': unrecognized expectation: ' + expectation + ' of type ' + (typeof expectation) + '\n';
    }
    return result;
}

exports.match = match;

