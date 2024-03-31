import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  await prisma.todo.deleteMany();

  const dataCreate = {
    data: [
      { description: 'Piedra del alma', complete: true },
      { description: 'Piedra del poder' },
      { description: 'Piedra del tiempo' },
      { description: 'Piedra del espacio' },
      { description: 'Piedra del realidad' },
    ],
  };

  await prisma.todo.createMany(dataCreate);

  const response = { message: 'Seed Executed' };

  return NextResponse.json(response);
}
