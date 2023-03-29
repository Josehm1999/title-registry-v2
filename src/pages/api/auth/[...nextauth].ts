import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { env } from '../../../env/server.mjs';
import { SiweMessage } from 'siwe';
import { NextApiRequest, NextApiResponse } from 'next';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    address: string;
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: 'Etherum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || '{}')
          );
          const nextAuthUrl = new URL(env.NEXTAUTH_URL);

          if (siwe.domain !== nextAuthUrl.host) {
            return null;
          }

          if (siwe.nonce !== (await getCsrfToken({ req }))) {
            return null;
          }

          await siwe.validate(credentials?.signature || '');
          return {
            id: siwe.address,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ];


  const isDefaultSigninPage =
    req.method === 'GET' && req.query.nextauth!.includes('signin');

  // Hides Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: 'jwt',
    },
    secret: env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        session.address = token.sub!;
        session.user!.name = token.sub;
        return session;
      },
    },
  });
}
