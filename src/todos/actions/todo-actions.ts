'use server';

import { revalidatePath } from 'next/cache';

import { Todo } from '@prisma/client';

import prisma from '@/lib/prisma';

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(3);
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (todo) {
    const params = {
      where: { id },
      data: { complete },
    };

    const updatedTodo = await prisma.todo.update(params);

    const path = '/dashboard/server-todos';
    revalidatePath(path);

    return updatedTodo;
  }

  const messageError = `Todo con el id ${id} no fue encontrado`;
  throw new Error(messageError);
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });
    const path = '/dashboard/server-todos';
    revalidatePath(path);

    return todo;
  } catch (error) {
    const errorMessage = { message: 'Error al crear todo' };

    return errorMessage;
  }
};

export const deleteCompleted = async (): Promise<void> => {
  const params = { where: { complete: true } };
  await prisma.todo.deleteMany(params);

  const path = '/dashboard/server-todos';
  revalidatePath(path);
};
