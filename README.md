# 🎤 Rhyme Write

> Let's have fun discovering unexpected rhymes.

**Rhyme Write** は、日本語の「韻踏み」をゲーム感覚で楽しめるブラウザゲームです。  
お題の言葉に対して韻を踏んだ言葉を入力し、スコアを競いましょう！

![Rhyme Write Screenshot](screenshot.png)

## 🎮 遊び方

1. **GAME START** を押してゲーム開始
2. 画面上部に表示される **お題** の言葉を確認
3. 制限時間内に **韻を踏んだ言葉** を入力して「Rhymin'」ボタンを押す
4. 母音の一致度に応じて判定が出ます：
   - **GOAT!!!!!** — 完全一致（最高評価）
   - **GOOD!** — 70%以上一致
   - **SO SO** — 40%以上一致
   - **BOO** — 不一致 or 存在しない言葉
5. 全ラウンドクリアを目指そう！

## ✨ 特徴

- 🇯🇵 **日本語の母音解析エンジン**搭載（Kuromoji ベース）
- 📖 **300語以上のお題**（ヒップホップ / 食べ物 / 雑貨 / カルチャー / 歴史）
- 🎵 **BGM付き**のヒップホップな雰囲気
- 🔍 **辞書バリデーション** — 存在しない言葉はBOO判定
- 📱 **レスポンシブ対応** — PCでもスマホでも遊べます

## 🛠️ 技術スタック

- **HTML5 / CSS3 / Vanilla JavaScript**（フレームワーク不使用）
- **[Kuromoji.js](https://github.com/takuyaa/kuromoji.js)** — 日本語形態素解析
- **SVG** — UIレイアウト・アニメーション
- **Web Audio API** — BGM再生

## 🚀 セットアップ

静的サイトなのでサーバー不要です。ローカルで動かす場合は簡易サーバーを使ってください：

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/rhyme-write.git
cd rhyme-write

# 簡易サーバーで起動（以下のいずれか）
npx serve .
# or
python3 -m http.server 8080
```

ブラウザで `http://localhost:8080` を開けばプレイできます。

## 📁 プロジェクト構成

```
rhyme-write/
├── index.html              # メインHTML
├── css/
│   └── style.css           # スタイルシート
├── js/
│   ├── app.js              # ゲームロジック
│   ├── rhyme-engine.js     # 韻判定エンジン
│   └── dictionary.js       # 韻辞書データ
├── bg.svg                  # 背景SVG
├── mic.svg                 # マイクアイコン
├── start.svg               # スタートボタン
└── *.mp3                   # BGM音源
```

## 📄 ライセンス

MIT License

## 🙏 クレジット

- BGM: [Pixabay](https://pixabay.com/) — Kontraa
- 日本語解析: [Kuromoji.js](https://github.com/takuyaa/kuromoji.js)
