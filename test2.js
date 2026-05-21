const fs = require('fs');
eval(fs.readFileSync('./js/dictionary.js', 'utf8'));
eval(fs.readFileSync('./js/rhyme-engine.js', 'utf8'));

// mock kuromoji
const engine = new RhymeEngine(DICTIONARY);
engine.isReady = true;

// Mock getting reading directly since we don't load kuromoji async in this test
engine.getReading = () => "あまいかおりのみるくてぃ";

const res = engine.findRhymes("甘い香りのミルクティ");
console.log("Vowels:", getVowels("あまいかおりのみるくてぃ"));
console.log(res.slice(0, 5).map(r => r.word + " (" + r.matchType + ")"));
