var promichromi = require('promichromi');
require('purl/purl.js');
var typecheck = require('./typecheck.js');

(function (config) {
function isArray(object) {
    var arrayCstrPrefix = 'function Array()';
    return object && 'object' == (typeof object)
        && arrayCstrPrefix == (''+object.constructor).substring(0,arrayCstrPrefix.length);
}

function template(arr) {
    var result = '[';
    for (var i = 0; i<arr.length; ++i) {
        if (i > 0) {
            result += ',';
        }
        var eType = typeof arr[i];
        if ('object' != eType) {
            result += ('\'' + eType + '\'');
        } else if (null === arr[i]) {
            result += ('');
        } else if (isArray(arr[i])){
            result += template(arr[i]);
        }
    }
    return result + ']'
}

promichromi.runtime.onMessageExternal.addListener(function(request, sender, sendResponse){
    if (request.type = "request") {
        if (request.method = 'GET' && request.url.match(/https?\:\/\/translate.google.com\/translate_a\/single\?/) ) {
            var params = purl(request.url).param();
            var source = params['q'];
            var sourceLang = params['sl'];
            var targetLand = params['tl'];
            // var response = Function("return " +request.response)();
            console.log(params);
            console.log(request.response);
            console.log(typecheck.match(request.response, config.responseExpectation));
        }
    }
})
})(cfg);

