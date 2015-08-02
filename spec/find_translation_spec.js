// File encoding is UTF-8. Watch out, there are russian characters in the text
translationSpec = require('./translation_spec_template.js').translationSpec;

translationSpec('Translations of aspen to Russian', './data/aspen-ru.har.js', -1, {
    original: 'aspen',
    sourceLang: 'auto',
    targetLang: 'ru',
    detectedLangs: [ {lang: 'en', confidence: 0.9285714}],
    translations: [
        {partOfSpeech: 'noun', means: ['осина']},
        {partOfSpeech: 'adjective', means: ['осиновый']}
    ]
})

translationSpec('Translations of a to Russian', './data/aspen-ru.har.js', 0, {
    original: 'a',
    sourceLang: 'auto',
    targetLang: 'ru',
    detectedLangs: [ {lang: 'en', confidence: 0.79799998}],
    translations: [
        {partOfSpeech: 'article', means: ['некий','какой-то','один','одинаковый','такой же','каждый','неопределенный артикль']},
        {partOfSpeech: 'noun', means: ['высшая отметка','круглое отлично']},
        {partOfSpeech: 'abbreviation', means: ['возраст','акр','пополудни']}
    ]
})

translationSpec('Translations of as to Russian', './data/aspen-ru.har.js', 1, {
    original: 'as',
    sourceLang: 'auto',
    targetLang: 'ru',
    detectedLangs: [ {lang: 'en', confidence: 0.95463508}],
    translations: [
        {partOfSpeech: 'adverb', means: ['как','как например','согласно']},
        {partOfSpeech: 'conjunction', means: ['как','когда','в то время как','по мере того как','так как','как будто',
            'как только','так что','до тех пор пока','потому что','хотя','как ни']},
        {partOfSpeech: 'preposition', means: ['в качестве','в виде']},
        {partOfSpeech: 'pronoun', means: ['какой','который','что']},
    ]
})
