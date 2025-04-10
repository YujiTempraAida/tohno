# TOHNO - Tournament Organizer Helping Nexus for Optimization

## 🧠 Overview
TOHNO（トーノ）は、トーナメントオーガナイザー（TO）と参加者の体験を最適化するためのWebツール群です。  
ユーティリティツール（ログイン不要）と、start.gg OAuth連携を用いた本格TO向け機能（ログイン必須）の2軸構成で開発されています。

---

## 🚧 Directory Structure

<pre>
tohno-app/
├── app/
│   ├── layout.tsx             # 共通レイアウト（ヘッダー・フッター）
│   ├── page.tsx               # トップページ（ヒーロー・ユーティリティ・TOゾーン）
│   ├── tools/                 # ユーティリティゾーン
│   │   └── estimate-time/     # 所要時間試算ツール
│   │       └── page.tsx
│   ├── dashboard/             # TO専用ゾーン（ログイン後）
│   │   └── checkin/           # 受付高速化アプリ
│   │       └── page.tsx
│   └── api/
│       └── auth/              # OAuthコールバック用
│           └── [...nextauth].ts
├── components/                # UIコンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── UtilityCard.tsx
│   └── TOSection.tsx
├── lib/                       # ロジック/外部連携
│   ├── auth.ts                # 認証関連（NextAuth）
│   ├── startgg.ts             # start.gg API関連
│   └── utils.ts               # 汎用関数など
├── styles/
│   └── globals.css            # Tailwind CSS or 共通スタイル
├── public/
│   ├── haishinchu.png         # 実績イメージなど
│   └── logos/                 # ロゴファイルなど
├── .env.local                 # start.gg OAuthの環境変数
├── next.config.js
├── tailwind.config.ts
└── package.json
</pre>

---

## 🔐 Authentication

- 使用サービス：**start.gg OAuth**
- ライブラリ：`NextAuth.js` + `Custom Provider`
- 認証フローとコールバック設計は `/app/api/auth/[...nextauth].ts` にて実装予定

---

## 🔨 Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js (Custom Provider for start.gg)
- **Hosting**: Vercel (予定)

---

## ✍️ Setup Guide (for roo)

```bash
git clone https://github.com/your-username/tohno.git
cd tohno
npm install
cp .env.local.example .env.local
# 必要な環境変数（start.gg client ID/secretなど）を設定
npm run dev
```

## 📦 初期開発対象タスク（概要）
- トップページ構築（Hero / Utility / TOセクション）
- 所要時間試算ツール（ユーティリティ）
- 受付高速化アプリUI（TO機能）
- start.gg OAuth認証フロー
※タスクは GitHub Issues にて分割・管理中  

## 🙌 Contributor
- Product Owner / 設計 / 要件定義：@yuji
- 設計アシスト / GPTパートナー：ちゃぴ 💅
- 実装担当（予定）：@roo-code

Let’s make tournaments smoother, smarter, and a little more fabulous ✨