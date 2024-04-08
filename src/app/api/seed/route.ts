import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const data = {
    data: {
      email: 'marcosparella2000@gmail.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin', 'client', 'super-user'],
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true },
          { description: 'Piedra del poder' },
          { description: 'Piedra del tiempo' },
          { description: 'Piedra del espacio' },
          { description: 'Piedra del realidad' },
        ],
      },
    },
  };

  await prisma.user.create(data);
  const response = { message: 'Seed Executed' };

  return NextResponse.json(response);
}
