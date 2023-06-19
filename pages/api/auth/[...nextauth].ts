import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { fetchPostLoginAdmin } from '@/api/auth/index';
import { ILoginBody } from '@/api/auth/dtos/ILoginBody';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        serviceId: { label: 'id', type: 'text' },
        password: {
          label: 'password',
          type: 'password',
          placeholder: '비밀번호',
        },
        token: { label: 'token', type: 'text' },
      },
      async authorize(credentials, req) {
        const res = await fetchPostLoginAdmin(credentials as ILoginBody);

        if (res.success) {
          return {
            ...res.data.admin,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = { ...token.user };
      return session;
    },
  },
};

export default NextAuth(authOptions);
