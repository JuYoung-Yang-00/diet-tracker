import Link from 'next/link';
import React from 'react';
import LogoutButton from '@/components/global/LogoutButton';

const Header: React.FC = () => {
  return (
    <div className='fixed inset-x-0 z-50 sm:top-0 bottom-0 flex justify-center bg-lime-500 sm:bg-transparent'>
      <div className='w-full max-w-[1450px] h-[60px] flex items-center justify-between px-8 backdrop-blur-sm'
        style={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}>
        <div className='flex flex-row gap-8 items-center'>
          <Link href='/'>
            <span className='text-4xl ml-1 hidden sm:flex'>🥗</span> 
          </Link>
        </div>
        <div className='flex flex-row items-center'>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
