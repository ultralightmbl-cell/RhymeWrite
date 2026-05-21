const kuromoji = require('kuromoji');
kuromoji.builder({ dicPath: "node_modules/kuromoji/dict" }).build((err, tokenizer) => {
    let words = ["平和", "へいわ", "ヘイワ", "令和", "れいわ"];
    for (let w of words) {
        let tokens = tokenizer.tokenize(w);
        console.log(`\n--- ${w} ---`);
        for (let t of tokens) {
            console.log(`${t.surface_form}: ${t.word_type}`);
        }
    }
});
