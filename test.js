const fs = require('fs');
const dictContent = fs.readFileSync('./js/dictionary.js', 'utf8');
const engineContent = fs.readFileSync('./js/rhyme-engine.js', 'utf8');

eval(dictContent);
eval(engineContent);

const engine = new RhymeEngine(DICTIONARY);
console.log(engine.findRhymes("最強の俺").slice(0, 10));
