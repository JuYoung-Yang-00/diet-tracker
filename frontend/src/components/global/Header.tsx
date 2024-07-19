'use client'
import React from 'react';
import LogoutButton from '@/components/global/LogoutButton';
import Image from 'next/image';

const Header: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload(); 
  };

  return (
    <div className='fixed top-0 left-0 right-0 z-50 transition-transform duration-300 backdrop-blur-sm flex justify-between max-w-[1400px] mx-auto py-2'
      style={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)'}}
    >
      <div className='flex flex-row gap-8 items-center'>
        <span
            className='text-4xl ml-1 cursor-pointer'
            onClick={handleRefresh}
          ><Image src='/diettracker.png' alt='logo' width={50} height={50} />
        </span>
      </div>
      <div className='flex flex-row items-center'>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
