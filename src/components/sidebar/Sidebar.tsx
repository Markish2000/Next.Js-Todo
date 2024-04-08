import Image from 'next/image';
import Link from 'next/link';

import { CiLogout } from 'react-icons/ci';
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from 'react-icons/io5';

import { LogoutButton, SidebarItem } from '..';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const menuItems = [
  { icon: <IoCalendarOutline />, path: '/dashboard', title: 'Dashboard' },
  {
    icon: <IoCheckboxOutline />,
    path: '/dashboard/rest-todos',
    title: 'Rest TODOS',
  },
  {
    icon: <IoListOutline />,
    path: '/dashboard/server-todos',
    title: 'Server Actions',
  },
  {
    icon: <IoCodeWorkingOutline />,
    path: '/dashboard/cookies',
    title: 'Cookies',
  },
  {
    icon: <IoBasketOutline />,
    path: '/dashboard/products',
    title: 'Productos',
  },
  {
    icon: <IoPersonOutline />,
    path: '/dashboard/profile',
    title: 'Perfil',
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const avatarUrl = session?.user?.image
    ? session.user.image
    : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';

  const userName = session?.user?.name ?? 'No Name';
  const userRol = session?.user?.roles ?? ['client'];

  return (
    <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          <Link href='#' title='home'>
            <Image
              src='https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'
              className='w-32'
              width={150}
              height={150}
              alt='tailus logo'
              title='tailus logo'
            />
          </Link>
        </div>

        <div className='mt-8 text-center'>
          <Image
            src={avatarUrl}
            className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
            width={150}
            height={150}
            alt=''
            title=''
          />
          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
            {userName}
          </h5>
          <span className='hidden text-gray-400 lg:block capitalize'>
            {userRol.join(',')}
          </span>
        </div>

        <ul className='space-y-2 tracking-wide mt-8'>
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
        <LogoutButton />
      </div>
    </aside>
  );
};
