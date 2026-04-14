import { useEffect, useState } from 'react';

import { getProfile } from '@/api/userService';

import type { User } from '@/types';
import { Button } from '@/components/button.tsx';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

import Sidebar from './Sidebar';

import logo from '@/assets/RestoLogo.png';
import logoWhite from '@/assets/RestoLogoWHITE.png';
import Man from '@/assets/Man.png';

import { ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
        localStorage.setItem('user', JSON.stringify(profile));
      } catch {
        setUser(null);
        localStorage.removeItem('user');
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  console.log('Navbar user:', user);
  return (
    <section
      id='baseBody'
      className={`fixed top-0 flex z-5000 flex-row w-full h-[64px] sm:h-[80px]  items-center justify-between px-[16px] sm:px-[120px] ${
        isScrolled
          ? 'bg-white sm:bg-black/40 sm:backdrop-blur-lg sm:transition-all sm:duration-300 '
          : 'bg-transparent sm:bg-white'
      }`}
    >
      <img
        id='mobileCompanyLogo'
        src={isScrolled ? logo : logoWhite}
        alt='companyLogoHere'
        className='sm:hidden flex w-[40px] h-[40px]'
      />
      <div
        id='desktopLogoSet'
        className='hidden sm:flex flex-row gap-[15px] w-[149px] h-[42px]'
      >
        <img
          id='desktopCompanyLogo'
          src={isScrolled ? logoWhite : logo}
          alt='companyLogoHere'
          className='sm:flex w-[42px] h-[42px]'
        />
        <p
          className={`font-extrabold text-[32px] ${
            isScrolled ? 'text-white' : 'text-black'
          }`}
        >
          Foody
        </p>
      </div>
      {/* This is the mobile version */}
      {isLoggedIn ? (
        <div className='sm:hidden flex flex-row gap-[16px] items-center'>
          <ShoppingBag className='w-[28px] h-[28px] text-white' />
          <Popover>
            <PopoverTrigger>
              <img
                src={user?.image || Man}
                alt={user?.name}
                className='w-[40px] h-[40px] rounded-full'
              />
            </PopoverTrigger>
            <PopoverContent align='end'>
              <Sidebar user={user} />
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button className='sm:hidden flex w-[80px] h-[40px] rounded-[100px] p-[8px] gap-[8px] bg-[#C12116] text-white text-base font-semibold'>
          Login
        </Button>
      )}
      {/* This is the desktop version */}
      {isLoggedIn ? (
        <div className='hidden flex-row gap-[24px] sm:flex items-center'>
          <ShoppingBag
            className={`w-[32px] h-[32px] ${
              isScrolled ? 'text-white' : 'text-black'
            } `}
          />
          <Popover>
            <PopoverTrigger>
              <img
                src={user?.image || Man}
                alt={user?.name}
                className='w-[48px] h-[48px] rounded-full'
              />
            </PopoverTrigger>
            <PopoverContent align='end'>
              <Sidebar user={user} />
            </PopoverContent>
          </Popover>

          <p
            className={`text-lg font-semibold tracking-tight ${
              isScrolled ? 'text-white' : 'text-black'
            } `}
          >
            {user?.name}
          </p>
        </div>
      ) : (
        <div className='hidden sm:flex flex-row w-[688.5px] h-[48px] gap-[16px] justify-end items-center'>
          <Button
            className={`flex w-[163px] h-[48px] rounded-[100px] p-[8px] gap-[8px] border-[#D5D7DA] ${
              isScrolled
                ? 'bg-transparent text-white border-[2px]'
                : 'bg-white text-black border-[1px] '
            } text-base font-semibold`}
          >
            Sign In
          </Button>
          <Button
            className={`flex w-[163px] h-[48px] rounded-[100px] p-[8px] gap-[8px] ${
              isScrolled ? 'bg-white text-black' : 'bg-[#C12116] text-white'
            } text-base font-semibold`}
          >
            Sign Up
          </Button>
        </div>
      )}
    </section>
  );
};

export default Navbar;
