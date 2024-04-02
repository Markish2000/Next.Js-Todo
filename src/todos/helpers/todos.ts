import { Todo } from '@prisma/client';

const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep();
  const body = { complete };

  const url = `/api/todos/${id}`;
  const params = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };

  const todo = await fetch(url, params).then((res) => res.json());

  return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const url = '/api/todos';
  const params = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };

  const todo = await fetch(url, params).then((res) => res.json());

  return todo;
};

export const deleteCompletedTodos = async (): Promise<boolean> => {
  const url = '/api/todos';
  const params = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  await fetch(url, params).then((res) => res.json());

  return true;
};
