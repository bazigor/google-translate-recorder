// define both exports.cfg and cfg global var, works
// with and without module loader.
exports == exports || {};
exports.cfg = cfg = {
    responseExpectation:[
         // 0
         [
             ['?string','?string',,'?string','number'],
             [,,'?string','?string']
         ],
         // 1
         { optional: true,
           sequenceOf:['string', {sequenceOf:'string'}, {sequenceOf:['string', {sequenceOf: 'string'},'?string', '?number']}, 'string', 'number']},
         // 2,3,4
         'string',,,
         // 5
         {sequenceOf:
             ['string','number',
                 {sequenceOf: ['string','number','boolean','boolean']},
                 [['number','number']],
                 '?string','number','number'
             ]
         },
         // 6
         'number',
         // 7
         ['string', 'string', ['number'], {flags: {optional: true}}], // Looks like 'did you mean?'
         // 8
         [{sequenceOf:'string'},, // Looks like detected languages
          {sequenceOf:'number'} // looks like lang detection confidence
         ],
         // 9, 10
         '?string','?string', // Haven't seen any data here
         // 11 -- Looks like autocomplete suggestions are here.
         [{sequenceOf: ['string',{sequenceOf: [{sequenceOf: 'string'},'string']},'string'], optional:true}],
         // 12
         {sequenceOf:['string', {sequenceOf:['string', 'string', 'string']}, 'string'], optional: true},
         // 13
         [{sequenceOf:['string',,,,'number','string']}, {flags: {optional: true}}],
         // 14
         [{sequenceOf:'string'}, {flags: {optional: true}}] // Looks like autosuggest
    ]
}
