// 注意: これは仮実装です。実際のアプリでは、start.ggのGraphQL APIを使用します。

/**
 * start.gg GraphQL APIクライアント
 */
export async function fetchFromStartGG(query: string, variables: any = {}, token?: string) {
  const endpoint = 'https://api.start.gg/gql/alpha';
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  // 認証トークンがある場合はヘッダーに追加
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors.map((e: any) => e.message).join('\n'));
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching from start.gg:', error);
    throw error;
  }
}

/**
 * ユーザー情報を取得
 */
export async function getUserProfile(token: string) {
  const query = `
    query GetUserProfile {
      currentUser {
        id
        name
        bio
        slug
        images {
          url
        }
      }
    }
  `;
  
  return fetchFromStartGG(query, {}, token);
}

/**
 * トーナメント情報を取得
 */
export async function getTournament(slug: string, token?: string) {
  const query = `
    query GetTournament($slug: String!) {
      tournament(slug: $slug) {
        id
        name
        slug
        startAt
        endAt
        events {
          id
          name
          slug
          numEntrants
        }
      }
    }
  `;
  
  return fetchFromStartGG(query, { slug }, token);
}

/**
 * イベント参加者を取得
 */
export async function getEventParticipants(eventId: number, token: string) {
  const query = `
    query GetEventParticipants($eventId: ID!, $page: Int!, $perPage: Int!) {
      event(id: $eventId) {
        id
        name
        entrants(query: {
          page: $page
          perPage: $perPage
        }) {
          pageInfo {
            total
            totalPages
          }
          nodes {
            id
            participants {
              id
              gamerTag
              user {
                id
                slug
                images {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;
  
  // 最初のページを取得
  const firstPage = await fetchFromStartGG(
    query,
    { eventId, page: 1, perPage: 100 },
    token
  );
  
  // 参加者が100人以下の場合はそのまま返す
  if (firstPage.event.entrants.pageInfo.totalPages <= 1) {
    return firstPage.event.entrants.nodes;
  }
  
  // 参加者が100人以上の場合は残りのページを取得
  const totalPages = firstPage.event.entrants.pageInfo.totalPages;
  const allParticipants = [...firstPage.event.entrants.nodes];
  
  for (let page = 2; page <= totalPages; page++) {
    const pageData = await fetchFromStartGG(
      query,
      { eventId, page, perPage: 100 },
      token
    );
    
    allParticipants.push(...pageData.event.entrants.nodes);
  }
  
  return allParticipants;
}