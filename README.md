# 天気予報アプリ 🌤️

シンプルで美しい天気予報Webアプリです。OpenWeatherMap APIを使用して、リアルタイムの天気情報を表示します。

## 機能

- 🌍 世界中の都市の天気情報を検索
- 🎨 天気に応じた動的背景色変更
- 🌟 天気アイコンとアニメーション効果
- 📱 レスポンシブデザイン（モバイル対応）
- ⚡ リアルタイム天気データ

## 表示される情報

- 現在の天気状況
- 気温と体感温度
- 湿度
- 風速
- 天気アイコン

## セットアップ

1. このリポジトリをクローンまたはダウンロード
```bash
git clone [your-repo-url]
cd weather-app
```

2. OpenWeatherMap APIキーを取得
   - [OpenWeatherMap](https://openweathermap.org/api)でアカウント作成
   - 無料のAPIキーを取得

3. APIキーを設定
   - `script.js`ファイルを開く
   - `API_KEY`変数に取得したAPIキーを設定
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```

4. ブラウザで`index.html`を開く

## 使用方法

1. 都市名を入力（例：Tokyo, London, New York）
2. 「天気を取得」ボタンをクリック
3. 天気情報とアイコンが表示されます

## 技術スタック

- HTML5
- CSS3 (Flexbox, Animations)
- Vanilla JavaScript
- OpenWeatherMap API

## 対応ブラウザ

- Chrome (推奨)
- Firefox
- Safari
- Edge

## ライセンス

MIT License

## 作者

[edamame13]