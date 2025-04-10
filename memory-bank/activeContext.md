# TOHNO - アクティブコンテキスト

## 現在の作業フォーカス
- Memory Bankの初期化と設定
- プロジェクト構造の理解と整理
- 開発環境のセットアップ準備

## 最近の変更
- Memory Bankの初期化（2025-04-11）
  - projectbrief.md
  - productContext.md
  - systemPatterns.md
  - techContext.md
  - activeContext.md
  - progress.md

## 次のステップ
1. **開発環境のセットアップ**
   - 必要なパッケージのインストール
   - 環境変数の設定
   - 開発サーバーの起動

2. **トップページの実装**
   - ヒーローエリアの作成
   - ユーティリティセクションの作成
   - TO専用ゾーンの作成

3. **ユーティリティツールの実装**
   - ダブルエリミネーション所要時間試算ツールの開発

4. **認証システムの実装**
   - start.gg OAuth連携の設定
   - NextAuth.jsの設定

5. **TO専用ツールの実装**
   - 受付高速化アプリUIの開発

## アクティブな決定事項
- Next.jsのApp Routerを採用
- Tailwind CSSでスタイリング
- start.gg OAuth連携による認証
- Vercelへのデプロイ予定

## 重要なパターンと設計方針
- モジュラー設計による拡張性の確保
- コンポーネントの再利用性を重視
- 認証状態に基づいた条件付きUIレンダリング
- ローカルDBを活用した高速データアクセス

## 学びと洞察
- start.gg APIの制約を理解し、ローカルDBを活用することで高速化が可能
- トーナメント運営の複雑さを理解し、段階的に機能を拡張する方針
- ユーザー体験を最優先に考え、使いやすさと効率性を重視する設計

## 現在の課題
- start.gg OAuth連携の詳細実装方法の確認
- ローカルDBの選定と設計
- トーナメント構造の計算アルゴリズムの最適化

## 参考リソース
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [start.gg API Documentation](https://developer.start.gg/docs/intro/)