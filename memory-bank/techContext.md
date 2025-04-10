# TOHNO - 技術コンテキスト

## 使用技術スタック

### フロントエンド
- **フレームワーク**: Next.js (App Router)
- **スタイリング**: Tailwind CSS
- **状態管理**: React Hooks
- **UI/UXライブラリ**: 未定（必要に応じて追加予定）

### バックエンド
- **サーバーサイドレンダリング**: Next.js
- **API**: Next.js API Routes
- **認証**: NextAuth.js (Custom Provider for start.gg)

### データベース
- **開発環境**: 未定（ローカルDBを使用予定）
- **本番環境**: 未定（Vercelデプロイに合わせて選定予定）

### 外部連携
- **認証サービス**: start.gg OAuth
- **APIサービス**: start.gg API

### デプロイ
- **ホスティング**: Vercel（予定）
- **CI/CD**: GitHub Actions（予定）

## 開発環境セットアップ

### 必要条件
- Node.js
- npm または yarn
- Git

### セットアップ手順
```bash
git clone https://github.com/your-username/tohno.git
cd tohno
npm install
cp .env.local.example .env.local
# 必要な環境変数（start.gg client ID/secretなど）を設定
npm run dev
```

### 環境変数
```
# start.gg OAuth クレデンシャル
STARTGG_CLIENT_ID=your_startgg_client_id_here
STARTGG_CLIENT_SECRET=your_startgg_client_secret_here

# NextAuth用（start.gg連携）
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

## 技術的制約

### start.gg API
- APIレート制限あり
- 一部のデータは取得できない可能性あり
- OAuth連携の認可スコープに制限あり

### ブラウザ互換性
- モダンブラウザ（Chrome, Firefox, Safari, Edge）をサポート
- IE11はサポート対象外

### モバイル対応
- レスポンシブデザインによるモバイル対応
- PWA対応は将来的な検討事項

## 依存関係

### 主要パッケージ
- next
- react
- react-dom
- tailwindcss
- next-auth

### 開発用パッケージ
- typescript
- eslint
- prettier
- jest（予定）

## ツール使用パターン

### コード品質管理
- ESLintによる静的解析
- Prettierによるコードフォーマット
- TypeScriptによる型チェック

### テスト戦略
- Jestによるユニットテスト（予定）
- React Testing Libraryによるコンポーネントテスト（予定）
- Cypress.ioによるE2Eテスト（将来的に検討）

### バージョン管理
- GitHubによるソースコード管理
- Semantic Versioningによるバージョニング

### デプロイフロー
- GitHub連携によるVercel自動デプロイ
- プレビューデプロイによる変更確認
- 本番環境へのマージ後自動デプロイ