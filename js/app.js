document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const startBtn = document.getElementById('start-btn');
    const svgTitle = document.getElementById('svg-title');
    const svgUi = document.getElementById('svg-ui');
    const quizPrompt = document.getElementById('quiz-prompt');
    const wordInput = document.getElementById('word-input');
    const roundInfo = document.getElementById('round-info');
    const countdownTimer = document.getElementById('countdown-timer');
    const countdownContainer = document.getElementById('countdown-container');
    const rhyminBtn = document.getElementById('rhymin-btn');
    const matchInfo = document.getElementById('match-info');
    const resultDisplay = document.getElementById('result-display');
    const quizPromptContainer = document.getElementById('quiz-prompt-container');
    const resultWord = document.getElementById('result-word');
    const bgm = document.getElementById('bgm');

    const ROUND_CONFIG = [
        { len: 3, time: 10 },
        { len: 3, time: 10 },
        { len: 4, time: 15 },
        { len: 4, time: 15 },
        { len: 5, time: 20 },
        { len: 6, time: 20 },
        { len: 7, time: 25 },
        { len: 8, time: 25 },
        { len: 9, time: 30 },
        { len: 10, time: 30 }
    ];

    const COOL_PHRASES = [
        // HIPHOP / ORIGINAL
        "リアル", "バトル", "マイク", "ピース", "フロー", "スキル", "覚悟", "才能", "ビート",
        "サイファー", "ヤバいぜ", "東京", "ライム", "ドリーム", "感覚", "直感", "最高",
        "オリジナル", "完璧な", "夜空に", "幻想", "瞬間", "運命", "情熱", "真夜中",
        "トリックアート", "マスターピース", "新時代", "奇想天外", "絶対的", "無限大",
        "マイクチェック", "パンチライン", "アンダーグラウンド", "ベストバウト",
        "トップオブトップ", "ヒップホップドリーム", "アンタッチャブル", "フロウとライム",
        "アルティメット", "甘酸っぱい記憶", "終わらない夜", "マイクのテスト",
        "サイファータイム", "フリースタイル", "レペゼンチキュウ", "オンガクノチカラ",
        "完璧なタイミング", "終わらない夜の夢", "限界突破のスキル",
        "百戦錬磨のMC", "唯一無二のスタイル", "予測不能の展開", "問答無用のスキル",
        "完全無欠のライマー", "前代未聞のフロウ", "天下無双のラッパー", "絶対王者",
        
        // 食べ物 (FOOD)
        "ハンバーガー", "オムライス", "チョコレート", "ラーメン", "カレーライス", 
        "ショートケーキ", "クラムチャウダー", "トムヤムクン", "ペペロンチーノ", 
        "カルボナーラ", "マルゲリータ", "ミルフィーユ", "パンケーキ", "フライドポテト", 
        "サンドイッチ", "マカロン", "モンブラン", "アイスクリーム", "シュークリーム", 
        "クロワッサン", "スパゲッティ", "グラタン", "ミネストローネ", "ブイヤベース", 
        "シュラスコ", "チンジャオロース", "ホイコーロー", "ローストビーフ", "麻婆豆腐", 
        "豚骨ラーメン", "焼き肉", "寿司", "天ぷら", "唐揚げ", "エビチリ", "餃子", 
        "お好み焼き", "たこ焼き", "すき焼き", "しゃぶしゃぶ", "うどん", "そば", 
        "味噌汁", "納豆", "刺身", "焼き鳥", "おでん", "カツ丼", "親子丼", "牛丼",
        "チョコレートケーキ", "ビーフストロガノフ", "マルゲリータピザ", "フライドチキン",
        "オムレツ", "チャーハン", "ハンバーグ", "パエリア", "タピオカミルク", "チーズケーキ",

        // 雑貨・アイテム (GOODS)
        "スニーカー", "サングラス", "腕時計", "スマートフォン", "ノートパソコン", 
        "ヘッドホン", "バックパック", "トートバッグ", "マグカップ", "クッション", 
        "カレンダー", "万年筆", "ボールペン", "手帳", "財布", "キーケース", 
        "ネックレス", "ブレスレット", "イヤリング", "香水", "キャンドル", "観葉植物", 
        "ドライフラワー", "写真立て", "カメラ", "タンブラー", "ポスター", "クロック", 
        "テーブルランプ", "絨毯", "ソファ", "スピーカー", "エコバッグ", "ハンカチ", 
        "ポーチ", "タオル", "傘", "メガネ", "歯ブラシ", "シャンプー", "タオルケット", 
        "ベッド", "本棚", "パソコンデスク", "アロマディフューザー", "ゲーミングマウス", 
        "ゲーミングチェア", "ワイヤレスイヤホン", "モバイルバッテリー", "クレジットカード",

        // カルチャー (CULTURE)
        "サブカルチャー", "アニメーション", "コミック", "映画鑑賞", "音楽鑑賞", 
        "ライブハウス", "クラブイベント", "フェスティバル", "美術館", "博物館", 
        "現代アート", "ポップカルチャー", "ファッション", "ストリート", "スケートボード", 
        "グラフィティ", "ブレイクダンス", "DJ", "ビートボックス", "バンド", "アイドル", 
        "コスプレ", "ビデオゲーム", "eスポーツ", "インターネット", "SNS", 
        "ユーチューバー", "ブロガー", "ポッドキャスト", "ラジオ", "雑誌", "小説", 
        "詩集", "演劇", "ミュージカル", "クラシック音楽", "ジャズ", "ロックンロール", 
        "パンク", "テクノ", "ハウス", "レゲエ", "K-POP", "J-POP", "写真展", 
        "映画祭", "コンテンポラリー", "インスタレーション", "プロジェクション", 
        "バーチャル", "デジタルアート", "エンターテインメント", "ドキュメンタリー",

        // 歴史 (HISTORY)
        "縄文時代", "弥生時代", "古墳時代", "飛鳥時代", "奈良時代", "平安時代", 
        "鎌倉時代", "室町時代", "安土桃山", "江戸時代", "明治維新", "大正ロマン", 
        "昭和レトロ", "平成", "令和", "織田信長", "豊臣秀吉", "徳川家康", 
        "坂本龍馬", "西郷隆盛", "新選組", "幕末", "戦国武将", "源頼朝", 
        "平清盛", "紫式部", "清少納言", "聖徳太子", "卑弥呼", "万葉集", 
        "古事記", "日本書紀", "産業革命", "ルネサンス", "フランス革命", 
        "アメリカ独立", "ローマ帝国", "古代エジプト", "ピラミッド", "シルクロード", 
        "大航海時代", "十字軍", "ナポレオン", "クレオパトラ", "ジャンヌダルク", 
        "ギリシャ神話", "三国志", "諸葛亮", "始皇帝", "ルネサンス美術", 
        "ベルサイユ宮殿", "ペリー来航", "大政奉還", "参勤交代", "メソポタミア文明", "インダス文明"
    ];

    let promptBuckets = {};
    let currentRound = 0;
    let totalScore = 0;
    let timerInterval = null;
    let timeRemaining = 0;
    let currentPromptVowels = "";

    const engine = new RhymeEngine(() => {
        // Prepare prompt buckets
        for (let phrase of COOL_PHRASES) {
            let res = engine.extractVowels(phrase);
            if (!res.error && res.vowels) {
                let len = res.vowels.length;
                if (!promptBuckets[len]) promptBuckets[len] = [];
                promptBuckets[len].push({ text: phrase, vowels: res.vowels });
            }
        }
        
        // Hide loading, show title screen
        loadingScreen.style.opacity = 0;
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            svgTitle.style.opacity = 1;
            startBtn.classList.remove('hidden');
        }, 500);
    });

    startBtn.addEventListener('click', () => {
        startBtn.classList.add('hidden');
        svgTitle.style.opacity = 0;
        
        if (bgm) {
            bgm.volume = 0.5;
            bgm.load();
            bgm.play().catch(e => console.log("Audio play failed:", e));
        }

        setTimeout(() => {
            svgUi.style.opacity = 1;
            quizPromptContainer.classList.remove('hidden');
            wordInput.classList.remove('hidden');
            roundInfo.classList.remove('hidden');
            countdownContainer.classList.remove('hidden');
            rhyminBtn.classList.remove('hidden');
            
            startRound(0);
        }, 1000);
    });

    function getPromptForLength(len) {
        if (promptBuckets[len] && promptBuckets[len].length > 0) {
            let options = promptBuckets[len];
            return options[Math.floor(Math.random() * options.length)];
        }
        // Fallback if no exact length phrase exists (generate exact length katakana)
        let fallbackText = "アイウエオカキクケコサシスセソタチツテトナニヌネノ".substring(0, len);
        return { text: fallbackText, vowels: engine.extractVowels(fallbackText).vowels };
    }

    function startRound(index) {
        if (index >= ROUND_CONFIG.length) {
            endGame();
            return;
        }

        currentRound = index;
        let config = ROUND_CONFIG[currentRound];
        let promptObj = getPromptForLength(config.len);
        currentPromptVowels = promptObj.vowels;
        
        roundInfo.innerHTML = `<span class="round-text">Round</span> <span class="round-num">${currentRound + 1}</span>`;
        quizPrompt.innerText = promptObj.text;
        
        wordInput.value = "";
        wordInput.disabled = false;
        wordInput.focus();
        
        resultDisplay.classList.add('hidden');
        matchInfo.classList.add('hidden');
        rhyminBtn.disabled = false;

        timeRemaining = config.time;
        countdownTimer.innerText = timeRemaining;
        countdownTimer.style.color = "#fff";
        
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeRemaining--;
            countdownTimer.innerText = timeRemaining;
            
            if (timeRemaining <= 5) {
                countdownTimer.style.color = "#ff0000";
            }
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                handleTimeOut();
            }
        }, 1000);
    }

    function handleTimeOut() {
        wordInput.disabled = true;
        rhyminBtn.disabled = true;
        showResult(0, "TIME OUT...", "残念...");
        setTimeout(() => startRound(currentRound + 1), 3000);
    }

    rhyminBtn.addEventListener('click', () => {
        submitAnswer();
    });

    wordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    });

    function submitAnswer() {
        let text = wordInput.value.trim();
        if (!text) return;
        
        clearInterval(timerInterval);
        wordInput.disabled = true;
        rhyminBtn.disabled = true;

        let judgment = engine.judgeRhyme(currentPromptVowels, text);
        
        if (judgment.error) {
            showResult(0, "ERROR", `「${judgment.failedWord}」が読めません！`);
            setTimeout(() => {
                wordInput.disabled = false;
                rhyminBtn.disabled = false;
                wordInput.focus();
                // Resume timer roughly
                countdownTimer.innerText = timeRemaining;
                timerInterval = setInterval(() => {
                    timeRemaining--;
                    countdownTimer.innerText = timeRemaining;
                    if (timeRemaining <= 5) {
                        countdownTimer.style.color = "#ff0000";
                    }
                    if (timeRemaining <= 0) {
                        clearInterval(timerInterval);
                        handleTimeOut();
                    }
                }, 1000);
            }, 2000);
            return;
        }

        totalScore += judgment.score;
        showResult(judgment.score, judgment.type, text);
        
        setTimeout(() => startRound(currentRound + 1), 3000);
    }

    function showResult(score, type, text) {
        matchInfo.classList.remove('hidden');
        resultDisplay.classList.remove('hidden');
        
        matchInfo.innerText = type + ` (+${score}pt)`;
        if (score === 100) matchInfo.style.color = "#ff5500";
        else matchInfo.style.color = "#000";
        
        resultWord.innerText = text;
    }

    function endGame() {
        quizPrompt.innerText = "GAME CLEAR!!";
        wordInput.classList.add('hidden');
        countdownContainer.classList.add('hidden');
        
        let rank = "ワックMC";
        if (totalScore >= 800) rank = "伝説のラッパー";
        else if (totalScore >= 500) rank = "実力派ライマー";
        else if (totalScore >= 300) rank = "ストリートのルーキー";

        matchInfo.classList.remove('hidden');
        resultDisplay.classList.remove('hidden');
        matchInfo.innerText = `Total Score: ${totalScore}pt`;
        resultWord.innerText = `称号: ${rank}`;
        
        rhyminBtn.disabled = true;
        rhyminBtn.classList.add('hidden');
    }
});
