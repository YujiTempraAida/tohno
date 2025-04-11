// 注意: これは仮実装です。実際のアプリでは、start.ggのOAuth連携を実装する必要があります。

import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface StartGGProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface ExtendedJWT extends JWT {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  profile?: StartGGProfile;
}

interface StartGGOAuthProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  [key: string]: unknown;
}

// start.gg OAuth用のカスタムプロバイダー（仮実装）
const StartGGProvider = {
  id: 'startgg',
  name: 'start.gg',
  type: 'oauth',
  version: '2.0',
  clientId: process.env.STARTGG_CLIENT_ID,
  clientSecret: process.env.STARTGG_CLIENT_SECRET,
  authorization: {
    url: 'https://start.gg/oauth/authorize',
    params: { scope: 'user.identity tournament.manager' }
  },
  token: 'https://api.start.gg/oauth/token',
  userinfo: 'https://api.start.gg/gql',
  profile(profile: StartGGOAuthProfile): StartGGProfile {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      image: profile.image
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    // @ts-expect-error - Custom provider type is not fully compatible with built-in types
    StartGGProvider
  ],
  callbacks: {
    async jwt({ token, account, profile }): Promise<ExtendedJWT> {
      // 初回サインイン時
      if (account && profile) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at,
          profile: profile as StartGGProfile
        };
      }

      // アクセストークンの有効期限チェック
      if (Date.now() < ((token as ExtendedJWT).accessTokenExpires ?? 0) * 1000) {
        return token;
      }

      // アクセストークンの更新（実際のアプリでは実装が必要）
      return token;
    },
    async session({ session, token }) {
      const extendedToken = token as ExtendedJWT;
      return {
        ...session,
        user: extendedToken.profile as StartGGProfile,
        accessToken: extendedToken.accessToken as string
      };
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};