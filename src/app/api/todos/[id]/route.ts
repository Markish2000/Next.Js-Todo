import { NextResponse } from 'next/server';

import { Todo } from '@prisma/client';
import * as yup from 'yup';

import prisma from '@/lib/prisma';

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findFirst({ where: { id } });
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await getTodo(id);

  if (todo) return NextResponse.json(todo);

  const message = `Todo con id ${id} no existe.`;
  return NextResponse.json({ message }, { status: 404 });
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await getTodo(id);

  if (todo) {
    try {
      const { complete, description } = await putSchema.validate(
        await request.json()
      );

      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete, description },
      });

      return NextResponse.json(updatedTodo);
    } catch (error) {
      return NextResponse.json(error, { status: 400 });
    }
  }

  const message = `Todo con id ${id} no existe.`;
  return NextResponse.json({ message }, { status: 404 });
}
