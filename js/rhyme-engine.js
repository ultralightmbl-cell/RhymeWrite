const VOWEL_MAP = {
    'あ':'a', 'い':'i', 'う':'u', 'え':'e', 'お':'o',
    'か':'a', 'き':'i', 'く':'u', 'け':'e', 'こ':'o',
    'さ':'a', 'し':'i', 'す':'u', 'せ':'e', 'そ':'o',
    'た':'a', 'ち':'i', 'つ':'u', 'て':'e', 'と':'o',
    'な':'a', 'に':'i', 'ぬ':'u', 'ね':'e', 'の':'o',
    'は':'a', 'ひ':'i', 'ふ':'u', 'へ':'e', 'ほ':'o',
    'ま':'a', 'み':'i', 'む':'u', 'め':'e', 'も':'o',
    'や':'a', 'ゆ':'u', 'よ':'o',
    'ら':'a', 'り':'i', 'る':'u', 'れ':'e', 'ろ':'o',
    'わ':'a', 'を':'o', 'ん':'n',
    'が':'a', 'ぎ':'i', 'ぐ':'u', 'げ':'e', 'ご':'o',
    'ざ':'a', 'じ':'i', 'ず':'u', 'ぜ':'e', 'ぞ':'o',
    'だ':'a', 'ぢ':'i', 'づ':'u', 'で':'e', 'ど':'o',
    'ば':'a', 'び':'i', 'ぶ':'u', 'べ':'e', 'ぼ':'o',
    'ぱ':'a', 'ぴ':'i', 'ぷ':'u', 'ぺ':'e', 'ぽ':'o',
    'ぁ':'a', 'ぃ':'i', 'ぅ':'u', 'ぇ':'e', 'ぉ':'o',
    'ゃ':'a', 'ゅ':'u', 'ょ':'o', 'ー':'-', 'っ':'x', 'ン':'n',
    'ア':'a', 'イ':'i', 'ウ':'u', 'エ':'e', 'オ':'o',
    'カ':'a', 'キ':'i', 'ク':'u', 'ケ':'e', 'コ':'o',
    'サ':'a', 'シ':'i', 'ス':'u', 'セ':'e', 'ソ':'o',
    'タ':'a', 'チ':'i', 'ツ':'u', 'テ':'e', 'ト':'o',
    'ナ':'a', 'ニ':'i', 'ヌ':'u', 'ネ':'e', 'ノ':'o',
    'ハ':'a', 'ヒ':'i', 'フ':'u', 'ヘ':'e', 'ホ':'o',
    'マ':'a', 'ミ':'i', 'ム':'u', 'メ':'e', 'モ':'o',
    'ヤ':'a', 'ユ':'u', 'ヨ':'o',
    'ラ':'a', 'リ':'i', 'ル':'u', 'レ':'e', 'ロ':'o',
    'ワ':'a', 'ヲ':'o', 'ン':'n',
    'ガ':'a', 'ギ':'i', 'グ':'u', 'ゲ':'e', 'ゴ':'o',
    'ザ':'a', 'ジ':'i', 'ズ':'u', 'ゼ':'e', 'ゾ':'o',
    'ダ':'a', 'ヂ':'i', 'ヅ':'u', 'デ':'e', 'ド':'o',
    'バ':'a', 'ビ':'i', 'ブ':'u', 'ベ':'e', 'ボ':'o',
    'パ':'a', 'ピ':'i', 'プ':'u', 'ペ':'e', 'ポ':'o',
    'ァ':'a', 'ィ':'i', 'ゥ':'u', 'ェ':'e', 'ォ':'o',
    'ャ':'a', 'ュ':'u', 'ョ':'o', 'ッ':'x'
};

const KATAKANA_BY_VOWEL = {
    'a': ['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', 'ガ', 'ザ', 'ダ', 'バ', 'パ'],
    'i': ['イ', 'キ', 'シ', 'チ', 'ニ', 'ヒ', 'ミ', 'リ', 'ギ', 'ジ', 'ビ', 'ピ'],
    'u': ['ウ', 'ク', 'ス', 'ツ', 'ヌ', 'フ', 'ム', 'ユ', 'ル', 'グ', 'ズ', 'ブ', 'プ'],
    'e': ['エ', 'ケ', 'セ', 'テ', 'ネ', 'ヘ', 'メ', 'レ', 'ゲ', 'ゼ', 'デ', 'ベ', 'ペ'],
    'o': ['オ', 'コ', 'ソ', 'ト', 'ノ', 'ホ', 'モ', 'ヨ', 'ロ', 'ゴ', 'ゾ', 'ド', 'ボ', 'ポ'],
    'n': ['ン'],
    'x': ['ッ'],
    '-': ['ー']
};

const GRAMMAR_TEMPLATES = [
    ['N'],
    ['A', 'N'],
    ['V', 'N'],
    ['N', 'P', 'N'],
    ['N', 'P', 'V'],
    ['A', 'N', 'P', 'N'],
    ['V', 'N', 'P', 'N'],
    ['N', 'P', 'V', 'N'],
    ['Adv', 'V'],
    ['Adv', 'A'],
    ['A', 'N', 'P', 'V'],
    ['V', 'N', 'P', 'V']
];

function generateRandomKatakanaRhyme(vowels) {
    let result = '';
    for (let i = 0; i < vowels.length; i++) {
        let v = vowels[i];
        if (KATAKANA_BY_VOWEL[v]) {
            let options = KATAKANA_BY_VOWEL[v];
            result += options[Math.floor(Math.random() * options.length)];
        } else {
            result += 'ア';
        }
    }
    return result;
}

function getVowels(reading) {
    let vowels = '';
    let chars = reading.split('');
    
    for (let i = 0; i < chars.length; i++) {
        let c = chars[i];
        if (c === 'ー') {
            if (vowels.length > 0) vowels += vowels[vowels.length - 1];
            continue;
        }
        if (['ゃ', 'ゅ', 'ょ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ャ', 'ュ', 'ョ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ'].includes(c)) {
            if (vowels.length > 0) {
                vowels = vowels.slice(0, -1) + VOWEL_MAP[c];
            } else {
                vowels += VOWEL_MAP[c];
            }
            continue;
        }
        if (c === 'っ' || c === 'ッ') { vowels += 'x'; continue; }
        if (c === 'ん' || c === 'ン') { vowels += 'n'; continue; }
        if (c === ' ' || c === '　') continue;
        if (VOWEL_MAP[c]) vowels += VOWEL_MAP[c];
    }
    return vowels;
}

function hiraToKana(str) {
    return str.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    });
}

class RhymeEngine {
    constructor(onReady) {
        this.tokenizer = null;
        this.isReady = false;

        if (typeof kuromoji !== 'undefined') {
            kuromoji.builder({ dicPath: 'dict/' }).build((err, tokenizer) => {
                if (err) {
                    console.warn("Local dictionary load failed (likely CORS restriction on file:// protocol). Falling back to CDN...", err);
                    kuromoji.builder({ dicPath: 'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict' }).build((cdnErr, cdnTokenizer) => {
                        if (cdnErr) {
                            console.error("Kuromoji CDN dict load error", cdnErr);
                            return;
                        }
                        this.tokenizer = cdnTokenizer;
                        this.isReady = true;
                        if (onReady) onReady();
                    });
                    return;
                }
                this.tokenizer = tokenizer;
                this.isReady = true;
                if (onReady) onReady();
            });
        }
    }

    extractVowels(text) {
        if (!this.isReady || !this.tokenizer) {
            return { error: true, vowels: null };
        }

        const tokens = this.tokenizer.tokenize(text);
        let reading = "";

        for (let token of tokens) {
            if (token.pronunciation) {
                reading += token.pronunciation;
            } else if (token.reading) {
                reading += token.reading;
            } else {
                let surface = token.surface_form;
                if (/^[\u3040-\u309F\u30A0-\u30FFー]+$/.test(surface)) {
                    reading += hiraToKana(surface);
                } else {
                    return { error: true, vowels: null, failedWord: surface };
                }
            }
        }

        return { error: false, vowels: getVowels(reading) };
    }

    judgeRhyme(promptVowels, userText) {
        let result = this.extractVowels(userText);
        if (result.error) return { error: true, failedWord: result.failedWord };

        let userVowels = result.vowels;
        if (!userVowels) return { score: 0, type: 'BOO' };

        let matches = 0;
        let minLen = Math.min(promptVowels.length, userVowels.length);

        for (let i = 1; i <= minLen; i++) {
            if (promptVowels[promptVowels.length - i] === userVowels[userVowels.length - i]) {
                matches++;
            }
        }

        let ratio = matches / promptVowels.length;
        let type = 'BOO';

        if (ratio === 1 && promptVowels.length === userVowels.length) {
            type = 'GOAT!!!!!';
        } else if (ratio >= 0.7) {
            type = 'GOOD!';
        } else if (ratio >= 0.4) {
            type = 'SO SO';
        }

        return {
            error: false,
            score: Math.round(ratio * 100),
            type: type,
            userVowels: userVowels
        };
    }

    findRhymes(inputWord) {
        const inputVowels = getVowels(inputWord);
        if (!inputVowels || inputVowels.length === 0) return [];

        let results = [];
        let seenKatakana = new Set();
        
        const searchGrammar = (targetVowels, template) => {
            let matches = [];
            const dfs = (posIndex, currentVowelIndex, currentWords) => {
                if (posIndex === template.length) {
                    if (currentVowelIndex === targetVowels.length) {
                        matches.push([...currentWords]);
                    }
                    return;
                }
                let remainingSlots = template.length - posIndex;
                let remainingVowels = targetVowels.length - currentVowelIndex;
                if (remainingSlots > remainingVowels) return;
                let requiredPos = template[posIndex];
                let candidates = this.dictionary.filter(w => w.p === requiredPos);
                candidates.sort(() => Math.random() - 0.5);
                let branchLimit = 0;
                for (let candidate of candidates) {
                    let v = candidate.v;
                    let isPrefix = true;
                    for (let i = 0; i < v.length; i++) {
                        if (targetVowels[currentVowelIndex + i] !== v[i]) {
                            isPrefix = false;
                            break;
                        }
                    }
                    if (isPrefix) {
                        currentWords.push(candidate);
                        dfs(posIndex + 1, currentVowelIndex + v.length, currentWords);
                        currentWords.pop();
                        branchLimit++;
                        if (branchLimit > 50) break;
                    }
                }
            };
            dfs(0, 0, []);
            return matches;
        };

        for (let template of GRAMMAR_TEMPLATES) {
            let validMatches = searchGrammar(inputVowels, template);
            for (let match of validMatches) {
                let kataStr = match.map(w => w.k).join('');
                let kanjiStr = match.map(w => w.w).join('');
                if (!seenKatakana.has(kataStr) && kataStr !== inputWord) {
                    seenKatakana.add(kataStr);
                    results.push({ word: kataStr, matchType: `（${kanjiStr}）`, score: 100 + template.length });
                }
            }
        }
        
        const searchCombinations = (targetVowels) => {
            let matches = [];
            const dfs = (currentVowelIndex, currentWords) => {
                if (currentVowelIndex === targetVowels.length) {
                    if (currentWords.length > 0) matches.push([...currentWords]);
                    return;
                }
                if (currentWords.length >= 4) return;
                let remainingVowels = targetVowels.substring(currentVowelIndex);
                let candidates = this.dictionary.filter(w => remainingVowels.startsWith(w.v));
                candidates.sort((a, b) => b.v.length - a.v.length || Math.random() - 0.5);
                let branchLimit = 0;
                for (let candidate of candidates) {
                    currentWords.push(candidate);
                    dfs(currentVowelIndex + candidate.v.length, currentWords);
                    currentWords.pop();
                    branchLimit++;
                    if (branchLimit > 10) break;
                }
            };
            dfs(0, []);
            return matches;
        };

        if (results.length < 5) {
            let comboMatches = searchCombinations(inputVowels);
            for (let match of comboMatches) {
                let kataStr = match.map(w => w.k).join('');
                let kanjiStr = match.map(w => w.w).join('・');
                if (!seenKatakana.has(kataStr) && kataStr !== inputWord) {
                    seenKatakana.add(kataStr);
                    results.push({ word: kataStr, matchType: `（${kanjiStr}）- 単語コンボ`, score: 95 });
                }
            }
        }

        while (results.length < 10) {
            let randomRhyme = generateRandomKatakanaRhyme(inputVowels);
            if (!seenKatakana.has(randomRhyme) && randomRhyme !== inputWord) {
                seenKatakana.add(randomRhyme);
                results.push({ word: randomRhyme, matchType: 'AI生成のスキャット', score: 90 });
            }
        }

        results.sort((a, b) => b.score - a.score);
        return results.slice(0, 50);
    }
}
