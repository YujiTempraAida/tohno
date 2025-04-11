// 注意: これは仮実装です。実際のアプリでは、start.ggのOAuth連携を実装する必要があります。

import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };