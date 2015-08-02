exports.extract = function(request, response) {
    var query = request.param();
    var translations = {};
    if (response[1]) {
       response[1].forEach(function(tran){
           if (tran[0]) {
               // TODO: check for duplicates
               translations[tran[0]] = tran[1];
           }
       })
    }
    return {
        source: query['q'],
        sourceLanguage: query['sl'],
        targetLanguage: query['tl'],
        detectedLanguage: response[2],
        detectionConfidence: response[6],
        translations: translations
    };
}