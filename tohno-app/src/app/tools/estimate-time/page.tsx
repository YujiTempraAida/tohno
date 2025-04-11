'use client';

import { useState } from 'react';

export default function EstimateTimePage() {
  const [formData, setFormData] = useState({
    entrants: 32,
    phases: 1,
    waves: 1,
    pools: 4,
    setups: 8,
    timePerMatch: 15,
    progressCount: 2,
  });

  const [results, setResults] = useState<{
    totalTime: number;
    rotations: number;
    rotationDetails: string[];
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0,
    });
  };

  const calculateTime = () => {
    const { entrants, phases, waves, pools, setups, timePerMatch, progressCount } = formData;

    // 各フェーズの試合数を計算
    const matchesPerPhase = [];
    let remainingEntrants = entrants;
    
    for (let i = 0; i < phases; i++) {
      // プールフェーズ
      if (i === 0) {
        const matchesPerPool = Math.ceil(remainingEntrants / pools) - 1;
        const totalPoolMatches = matchesPerPool * pools;
        matchesPerPhase.push(totalPoolMatches);
        remainingEntrants = progressCount;
      }
      // 後続フェーズ（ダブルエリミネーション）
      else {
        const winnersMatches = Math.ceil(remainingEntrants / 2);
        const losersMatches = Math.floor(remainingEntrants / 2);
        matchesPerPhase.push(winnersMatches + losersMatches);
        remainingEntrants = Math.ceil(remainingEntrants / 2);
      }
    }

    // 総試合数
    const totalMatches = matchesPerPhase.reduce((sum, matches) => sum + matches, 0);
    
    // Wave数で分割して並行処理を考慮
    const matchesPerWave = Math.ceil(totalMatches / waves);
    
    // セットアップ数で割って必要なローテーション数を計算
    const rotationsPerWave = Math.ceil(matchesPerWave / setups);
    const totalRotations = rotationsPerWave * waves;
    
    // 総時間（分）
    const totalTimeMinutes = totalRotations * timePerMatch;
    
    // ローテーション詳細
    const rotationDetails = [];
    let remainingMatches = totalMatches;
    let currentRotation = 1;
    
    for (let wave = 1; wave <= waves; wave++) {
      const matchesInWave = Math.min(remainingMatches, matchesPerWave);
      let waveMatches = matchesInWave;
      
      while (waveMatches > 0) {
        const matchesInRotation = Math.min(waveMatches, setups);
        rotationDetails.push(`Wave ${wave}, ローテーション ${currentRotation}: ${matchesInRotation} 試合`);
        waveMatches -= matchesInRotation;
        currentRotation++;
      }
      
      remainingMatches -= matchesInWave;
    }
    
    setResults({
      totalTime: totalTimeMinutes,
      rotations: totalRotations,
      rotationDetails,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          ダブルエリミネーション所要時間試算ツール
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          トーナメントの所要時間を簡単に見積もることができます。
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="entrants" className="block text-sm font-medium text-gray-700">
                参加人数
              </label>
              <input
                type="number"
                name="entrants"
                id="entrants"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.entrants}
                onChange={handleChange}
                min="2"
              />
            </div>

            <div>
              <label htmlFor="phases" className="block text-sm font-medium text-gray-700">
                Phase数
              </label>
              <input
                type="number"
                name="phases"
                id="phases"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.phases}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div>
              <label htmlFor="waves" className="block text-sm font-medium text-gray-700">
                Wave数
              </label>
              <input
                type="number"
                name="waves"
                id="waves"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.waves}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div>
              <label htmlFor="pools" className="block text-sm font-medium text-gray-700">
                Pool数
              </label>
              <input
                type="number"
                name="pools"
                id="pools"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.pools}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div>
              <label htmlFor="setups" className="block text-sm font-medium text-gray-700">
                モニター数
              </label>
              <input
                type="number"
                name="setups"
                id="setups"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.setups}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div>
              <label htmlFor="timePerMatch" className="block text-sm font-medium text-gray-700">
                1試合の所要時間（分）
              </label>
              <input
                type="number"
                name="timePerMatch"
                id="timePerMatch"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.timePerMatch}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div>
              <label htmlFor="progressCount" className="block text-sm font-medium text-gray-700">
                抜け人数
              </label>
              <input
                type="number"
                name="progressCount"
                id="progressCount"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.progressCount}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={calculateTime}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              計算する
            </button>
          </div>
        </div>
      </div>

      {results && (
        <div className="mt-8 bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">計算結果</h2>
            
            <div className="border-t border-gray-200 pt-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">予想所要時間</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {Math.floor(results.totalTime / 60)}時間 {results.totalTime % 60}分
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">必要なローテーション数</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {results.rotations}回
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">ローテーション詳細</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {results.rotationDetails.map((detail, index) => (
                        <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}