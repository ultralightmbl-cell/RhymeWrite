const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
fs.writeFileSync('index.html', html.replace('<script src="https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/build/kuromoji.js"></script>\n    ', ''));

const app = fs.readFileSync('js/app.js', 'utf8');
const newApp = app.replace(/\/\/ Lock button while loading dictionary[\s\S]*?let currentRhymes = \[\];/, `    const engine = new RhymeEngine(DICTIONARY);
    let currentRhymes = [];`);
fs.writeFileSync('js/app.js', newApp);

console.log("Reverted html and app.js");
