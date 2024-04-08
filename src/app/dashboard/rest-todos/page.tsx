export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { redirect } from 'next/navigation';

import { NewTodo } from '@/components';
import { TodosGrid } from '@/todos';

import prisma from '@/lib/prisma';
import { getUserSessionServer } from '@/auth/actions/auth-actions';

export const metadata = {
  title: 'Listado de Todos',
  description: 'Listado de Todos',
};

export default async function RestTodosPage() {
  const user = await getUserSessionServer();

  if (!user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'asc' },
  });

  return (
    <div>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
