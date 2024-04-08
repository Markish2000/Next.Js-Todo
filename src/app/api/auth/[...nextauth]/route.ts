import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { signInEmailPassword } from '@/auth/actions/auth-actions';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { NextAuthOptions } from 'next-auth';

import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Correo electrónico',
          type: 'email',
          placeholder: 'usuario@gmail,com',
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: '******',
        },
      },
      async authorize(credentials, req) {
        const user = await signInEmailPassword(
          credentials!.email,
          credentials!.password
        );

        if (user) return user;

        return null;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? 'no-email' },
      });

      if (dbUser?.isActive) {
        token.roles = dbUser?.roles ?? ['no-roles'];
        token.id = dbUser?.id ?? 'no-uuid';

        return token;
      }

      throw new Error('El usuario no está activo.');
    },
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
