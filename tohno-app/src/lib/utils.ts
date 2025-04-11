/**
 * 日付をフォーマットする
 * @param date フォーマットする日付
 * @param format フォーマット（デフォルト: 'YYYY-MM-DD'）
 * @returns フォーマットされた日付文字列
 */
export function formatDate(date: Date, format = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * UNIXタイムスタンプを日付に変換する
 * @param timestamp UNIXタイムスタンプ（秒）
 * @returns Date オブジェクト
 */
export function unixTimestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

/**
 * 時間（分）を時間と分に変換する
 * @param minutes 合計分数
 * @returns {hours: number, minutes: number} 時間と分
 */
export function minutesToHoursAndMinutes(minutes: number): { hours: number; minutes: number } {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
}

/**
 * 時間（分）を「X時間Y分」形式の文字列に変換する
 * @param minutes 合計分数
 * @returns 「X時間Y分」形式の文字列
 */
export function formatMinutesToJapaneseTime(minutes: number): string {
  const { hours, minutes: mins } = minutesToHoursAndMinutes(minutes);
  
  if (hours === 0) {
    return `${mins}分`;
  }
  
  if (mins === 0) {
    return `${hours}時間`;
  }
  
  return `${hours}時間${mins}分`;
}

/**
 * 配列をチャンクに分割する
 * @param array 分割する配列
 * @param size チャンクサイズ
 * @returns チャンクの配列
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * ダブルエリミネーショントーナメントの試合数を計算する
 * @param entrants 参加者数
 * @returns 試合数
 */
export function calculateDoubleEliminationMatches(entrants: number): number {
  // 参加者数が2の累乗でない場合、次の2の累乗に切り上げる
  const actualEntrants = Math.pow(2, Math.ceil(Math.log2(entrants)));
  
  // Winners bracket: n-1
  // Losers bracket: n-2
  // Grand finals: 1 or 2
  // 合計: 2n-2 or 2n-1
  
  // 簡易計算（実際にはもっと複雑）
  return 2 * actualEntrants - 2;
}

/**
 * ローテーション数を計算する
 * @param matches 試合数
 * @param setups セットアップ数
 * @returns ローテーション数
 */
export function calculateRotations(matches: number, setups: number): number {
  return Math.ceil(matches / setups);
}

/**
 * CSVデータをJSONに変換する
 * @param csv CSVデータ
 * @param delimiter 区切り文字（デフォルト: ','）
 * @returns JSONオブジェクトの配列
 */
export function csvToJson(csv: string, delimiter = ','): Record<string, string>[] {
  const lines = csv.split('\n');
  const headers = lines[0].split(delimiter);
  
  return lines.slice(1).map(line => {
    if (!line.trim()) return {};
    
    const values = line.split(delimiter);
    return headers.reduce((obj, header, i) => {
      obj[header.trim()] = values[i]?.trim() || '';
      return obj;
    }, {} as Record<string, string>);
  }).filter(obj => Object.keys(obj).length > 0);
}

/**
 * JSONデータをCSVに変換する
 * @param json JSONオブジェクトの配列
 * @param delimiter 区切り文字（デフォルト: ','）
 * @returns CSVデータ
 */
export function jsonToCsv(json: Record<string, string | number | boolean>[], delimiter = ','): string {
  if (json.length === 0) return '';
  
  const headers = Object.keys(json[0]);
  const headerRow = headers.join(delimiter);
  
  const rows = json.map(obj => {
    return headers.map(header => {
      const value = obj[header] ?? '';
      // 値にデリミタが含まれている場合はダブルクォートで囲む
      return value.toString().includes(delimiter) ? `"${value}"` : value;
    }).join(delimiter);
  });
  
  return [headerRow, ...rows].join('\n');
}