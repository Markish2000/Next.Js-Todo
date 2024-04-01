import { Todo } from '@prisma/client';

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
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
