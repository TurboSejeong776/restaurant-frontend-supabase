import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { User } from '@/types';

import { MapPin } from 'lucide-react';
import { FileText } from 'lucide-react';
import { LogOutIcon } from 'lucide-react';

import Man from '@/assets/Man.png';

type SidebarProps = {
  user: User | null;
};

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate(`/Filter`);
  };
  console.log('Sidebar received user:', user);
  return (
    <section className='flex flex-col w-[240px] h-[274px] rounded-[16px] gap-[24px] p-[20px] bg-white text-black tracking-tight justify-center'>
      <div
        id='profDisplay'
        className='flex flex-row w-full h-[48px] gap-[8px] items-center'
      >
        <img
          src={user?.image || Man}
          alt='pfpHere'
          className='w-[48px] h-[48px] rounded-full'
        />
        <p className='font-bold text-lg text-black'>{user?.name}</p>
      </div>
      <div id='liner' className='w-full h-[1px] bg-[#E9EAEB]' />
      <button
        id='location'
        className='flex flex-row w-[150px] h-[30px] gap-[8px]'
      >
        <MapPin className='w-[24px] h-[24px]' />
        <p className='text-base font-medium'>Delivery Address</p>
      </button>
      <button
        id='orderlist'
        onClick={() => {
          navigate('/MyOrder');
        }}
        className='flex flex-row w-[104px] h-[30px] gap-[8px]'
      >
        <FileText className='w-[24px] h-[24px]' />
        <p className='text-base font-medium'>My Orders</p>
      </button>
      <button id='logout' className='flex flex-row w-[81px] h-[30px] gap-[8px]'>
        <LogOutIcon onClick={handleLogout} className='w-[24px] h-[24px]' />
        <p className='text-base font-medium'>Logout</p>
      </button>
    </section>
  );
};

export default Sidebar;
