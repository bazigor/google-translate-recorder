describe('Typecheck', function(){
    var typecheck = require('../typecheck.js');
    var fs = require('fs');
    var data;
    var config;

    beforeEach(function(){
        data = require('./data/aspen-en.har.js').value.log.entries;
        config = require('../config.js').cfg;
    })

    it('should parse all responses without errors', function(){
        pending('Expected type definition in incomplete');
        data.forEach(function(entry, index){
            var value = Function('return '+ entry.response.content.text)();
            expect(typecheck.match(value, config.responseExpectation, '@'+index)).toEqual('');
        });
    });
})
