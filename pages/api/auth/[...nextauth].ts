import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import authRepository from '@/api/auth';
import RequestLoginBody from '@/api/auth/dtos/requestLogin.dto';
import { ResponseRefreshToken } from '@/api/auth/dtos/responseRefreshToken.dto';
import client from '@/api/client';

async function refreshToken(tokenObject: any) {
  try {
    const BASE_URL = '/v1/business/auth';
    const response = await client.put<ResponseRefreshToken>(
      `${BASE_URL}/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenObject.user.refreshToken}`,
        },
      }
    );
    const {
      data: { accessToken, refreshToken },
    } = response;

    return {
      ...tokenObject,
      user: {
        ...tokenObject.user,
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: {
          label: 'password',
          type: 'password',
          placeholder: '비밀번호',
        },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        const res = await authRepository.login(credentials as RequestLoginBody);

        if (res.success) {
          return {
            ...res.data.user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        // This will only be executed at login.
        // Each next invocation will skip this part.
        token.user = user;
      }

      const decoded = jwtDecode(token.user.accessToken) as {
        id: number;
        iat: number;
        exp: number;
      };
      const expDate = dayjs.unix(decoded.exp);
      const now = dayjs();
      const diffMinutes = expDate.diff(now, 'minute');
      const shouldRefresh = diffMinutes <= 1;

      if (shouldRefresh) {
        const newToken = await refreshToken(token);
        return newToken;
      }

      return token;
    },
    session({ session, token, user }: any) {
      session.user = token.user;
      session.error = token.error;
      console.log('🚀 ~ file: [...nextauth] session:', session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
