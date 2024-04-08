import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';

import prisma from '@/lib/prisma';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};

export const signInEmailPassword = async (email: string, password: string) => {
  if (email || password) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const dbUser = await createUser(email, password);

      return dbUser;
    }

    if (!bcrypt.compareSync(password, user.password ?? '')) return null;

    return user;
  }

  return null;
};

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split('@')[0],
    },
  });

  return user;
};
