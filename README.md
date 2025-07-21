# 天気予報アプリ 🌤️

シンプルで美しい天気予報Webアプリです。OpenWeatherMap APIを使用して、リアルタイムの天気情報を表示します。

## 🌟 デモ

**GitHub Pages**: https://edamame13.github.io/weather-app/

## 機能

- 🌍 世界中の都市の天気情報を検索
- 🎨 天気に応じた動的背景色変更
- 🌟 天気アイコンとアニメーション効果
- 📱 レスポンシブデザイン（モバイル対応）
- ⚡ リアルタイム天気データ
- 🔒 セキュアなAPIキー管理（ローカルストレージ）

## 表示される情報

- 現在の天気状況
- 気温と体感温度
- 湿度
- 風速
- 天気アイコン

## 🚀 使用方法

### GitHub Pagesで使用（推奨）

1. https://edamame13.github.io/weather-app/ にアクセス
2. 都市名を入力して天気情報を取得
   - APIキーは安全に組み込まれているため、設定不要です
   - フォールバック機能により、必要に応じて手動設定も可能

### ローカルで使用

1. このリポジトリをクローン
```bash
git clone https://github.com/edamame13/weather-app.git
cd weather-app
```

2. ブラウザで`index.html`を開く
3. APIキーを設定して使用開始

## 🔑 APIキーの取得方法

1. [OpenWeatherMap](https://openweathermap.org/api)にアクセス
2. 「Sign Up」で無料アカウントを作成
3. ログイン後、「API keys」タブでAPIキーを確認
4. APIキーをコピーしてアプリに入力

**注意**: APIキーは有効になるまで数分〜数時間かかる場合があります。

## 🛡️ セキュリティ

- APIキーはブラウザのローカルストレージにのみ保存
- GitHubリポジトリにはAPIキーは含まれません
- 無効なAPIキーは自動的に削除されます

## 技術スタック

- HTML5
- CSS3 (Flexbox, Animations, CSS Grid)
- Vanilla JavaScript (ES6+)
- OpenWeatherMap API
- Local Storage API

## 対応ブラウザ

- Chrome (推奨)
- Firefox
- Safari
- Edge

## 🎨 特徴

- **動的背景**: 天気に応じて背景色が変化
- **アニメーション**: 天気アイコンが浮遊するアニメーション
- **レスポンシブ**: モバイルデバイスに対応
- **直感的UI**: シンプルで使いやすいインターフェース

## ライセンス

MIT License

## 作者

[@edamame13](https://github.com/edamame13)