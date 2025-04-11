import Hero from '@/components/Hero';
import UtilityCard from '@/components/UtilityCard';
import TOSection from '@/components/TOSection';

export default function Home() {
  // 実際のアプリではセッション情報から取得する
  const isLoggedIn = false;

  return (
    <main>
      {/* ヒーローエリア */}
      <Hero />

      {/* TO専用ゾーン */}
      <TOSection isLoggedIn={isLoggedIn} />

      {/* ユーティリティセクション */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">ユーティリティツール</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              ログイン不要で使える便利ツール
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              トーナメント運営に役立つ便利なツールを無料で提供しています。
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <UtilityCard
                title="ダブルエリミネーション所要時間試算ツール"
                description="複雑なトーナメントの所要時間を簡単に見積もれる計算機。参加人数、Phase数、Wave数、Pool数、モニター数などから所要時間を算出します。"
                href="/tools/estimate-time"
              />
              <UtilityCard
                title="今後追加予定のツール"
                description="start.ggのPDF進行表にメモ書きを残せるツールなど、便利な機能を順次追加予定です。"
                href="#"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
