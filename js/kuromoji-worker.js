// Web Worker: Kuromojiの重い辞書読み込み＆形態素解析をメインスレッド外で実行
importScripts('https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/build/kuromoji.js');

let tokenizer = null;

kuromoji.builder({ dicPath: 'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict' }).build(function(err, t) {
    if (err) {
        postMessage({ type: 'error', error: err.message });
        return;
    }
    tokenizer = t;
    postMessage({ type: 'ready' });
});

self.onmessage = function(e) {
    if (e.data.type === 'tokenize') {
        if (!tokenizer) {
            postMessage({ type: 'result', id: e.data.id, error: 'not ready' });
            return;
        }
        
        let tokens = tokenizer.tokenize(e.data.text);
        let reading = '';
        for (let token of tokens) {
            if (token.pronunciation) {
                reading += token.pronunciation;
            } else if (token.reading) {
                reading += token.reading;
            } else {
                let s = token.surface_form;
                if (/^[\u3040-\u309F]+$/.test(s)) {
                    reading += s.replace(/[\u3041-\u3096]/g, function(m) {
                        return String.fromCharCode(m.charCodeAt(0) + 0x60);
                    });
                } else if (/^[\u30A0-\u30FF\u30FC]+$/.test(s)) {
                    reading += s;
                } else {
                    reading += s;
                }
            }
        }
        
        postMessage({ type: 'result', id: e.data.id, reading: reading });
    }
};
