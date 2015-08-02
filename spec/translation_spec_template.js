window = {};
require('../modules/purl/purl.js');
var purl = window.purl;
var extract = require('../extract.js').extract;

exports.translationSpec = function(title, data, index, expectation){
    describe(title, function() {
        var result;

        beforeEach(function(){
            var allEntries = require(data).value.log.entries;
            var entry = index >=0 ? allEntries[index]: allEntries[allEntries.length+index];
            var parsedRequest = purl(entry.request.url);
            var parsedResponse = Function('return '+ entry.response.content.text)();
            result = extract(parsedRequest, parsedResponse);
        })

        it('should find original word in request', function(){
              expect(result.source).toEqual(expectation.original);
        })

        it('should find source language in the request', function(){
              expect(result.sourceLanguage).toEqual(expectation.sourceLang);
        })

        it('should find target language in the request', function(){
              expect(result.targetLanguage).toEqual(expectation.targetLang);
        })

        expectation.translations.forEach(function(expectedTranslation){
            var partOfSpeech = expectedTranslation.partOfSpeech;
            var variants = expectedTranslation.means;
            it('should find '+partOfSpeech+' in the response', function(){
                  expect(result.translations[partOfSpeech]).not.toBeUndefined();
            })
            it('should find '+partOfSpeech+' translation in the response', function(){
                  expect(result.translations[partOfSpeech]).toEqual(variants);
            })
        })

        it('should be no unexpected parts of speech', function(){
            var foundParts = {};
            Object.keys(result.translations).forEach(function(key){
                foundParts[key] = true;
            });
            expectation.translations.forEach(function(expectedTranslation){
                if (expectedTranslation.partOfSpeech in foundParts) {
                    delete foundParts[expectedTranslation.partOfSpeech];
                }
            })
            expect(Object.keys(foundParts)).toEqual([], 'found unexpected parts of speech');
        })

        it('should find detected language in the response', function(){
              expect(result.detectedLanguage).toEqual(expectation.detectedLangs[0].lang);
        })

        it('should find detection confidence in the response', function(){
              expect(result.detectionConfidence).toEqual(expectation.detectedLangs[0].confidence);
        })
    })
}