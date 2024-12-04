# pjt-dw-front
## 概要

### Gitの運用ルール
- developブランチから作業ブランチを切る
    - 作業ブランチ名は`feat/[名前]/[作業内容]`
- 作業ブランチで作業を行い、developブランチにプルリクエストを出す
- `gyuta`さんにレビューリクエストを出す
- レビューが通ったらdevelopブランチにマージ

## 環境構築
### 前提条件
- Docker
- VSCode

### セットアップ
#### 1. リポジトリをクローン
```bash
git clone git@github.com:emuni-kyoto/pjt-dw-front.git
```

#### 2. VSCodeのDevContainerで開く

#### 3. Biome-extension用biomeをダウンロード
- 右下に出るポップアップより`Download Biome`をクリック
- バージョン一覧より`latest`を選択

#### 4. リポジトリを信頼
- 左側ソース管理タブより`Manage Unsafe Repositories`をクリック
- 「安全とマークして開くリポジトリを選択してください」と表示されるので、当該リポジトリを選択

#### 5. パッケージをインストール
```bash
pnpm install
```

#### 6. 環境変数設定
```bash
cp .env.example .env
code .env
```

### 開発
#### 1. ローカルサーバーを起動
```bash
pnpm dev
```

#### 2. ブラウザで確認
- 他にサーバーが起動してなければ`http://localhost:3000`にアクセスで確認できる

#### 3. コーディング
- `src/app`以下のファイルを編集すると自動でホットリロードがかかる
- 上記の開発環境上で保存するたびにフォーマッタが走る
