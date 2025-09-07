import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const allowedDomains = (process.env.ALLOWED_DOMAINS || '').split(',').map(s=>s.trim()).filter(Boolean);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { prompt: 'consent', access_type: 'offline' } }
    })
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, profile }) {
      const email = user.email;
      const domain = (profile as any)?.hd || email?.split('@')[1];
      if (!domain || !allowedDomains.includes(domain)) return false;
      // upsert profile
      try {
        await supabase.from('user_profiles').upsert({
          id: user.id,
          email,
          full_name: user.name
        }, { returning: 'minimal' });
      } catch(e){
        console.error(e);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).email = token.email;
      }
      return session;
    }
  }
});
