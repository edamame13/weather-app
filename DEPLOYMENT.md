# デプロイメント手順

## GitHub Secretsの設定

1. GitHubリポジトリの「Settings」タブに移動
2. 左メニューの「Secrets and variables」→「Actions」をクリック
3. 「New repository secret」をクリック
4. 以下の情報を入力：
   - **Name**: `OPENWEATHER_API_KEY`
   - **Secret**: あなたのOpenWeatherMap APIキー
5. 「Add secret」をクリック

## GitHub Pagesの設定

1. リポジトリの「Settings」タブ
2. 左メニューの「Pages」
3. Source: 「GitHub Actions」を選択
4. 「Save」をクリック

## デプロイ方法

### 自動デプロイ
- `main`ブランチにプッシュすると自動的にデプロイされます
- GitHub Actionsがビルドを実行し、APIキーを安全に注入します

### 手動デプロイ
1. リポジトリの「Actions」タブ
2. 「Deploy to GitHub Pages」ワークフローを選択
3. 「Run workflow」をクリック

## セキュリティ

- APIキーはGitHub Secretsに安全に保存
- ソースコードにはプレースホルダーのみ含まれる
- ビルド時にのみAPIキーが注入される
- 公開されるコードにはAPIキーは含まれない

## フォールバック機能

- 組み込みAPIキーがない場合、ユーザーが手動でAPIキーを入力可能
- ローカル開発時も通常通り動作

## 確認方法

デプロイ後、以下を確認：
1. https://[username].github.io/weather-app/ にアクセス
2. APIキー入力画面が表示されずに直接天気検索が可能
3. 都市名を入力して天気情報が正常に表示される