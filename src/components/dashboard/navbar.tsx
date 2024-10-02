'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Logotipo, NavItem } from '@src/components';

import { INavItem } from '@src/interfaces';

import { useTheme } from 'next-themes';

import {
  PiCaretDownBold,
  PiCaretUpFill,
  PiGear,
  PiList,
  PiMoon,
  PiSignOut,
  PiSun,
  PiX,
} from 'react-icons/pi';

import { useCustomer } from '@src/contexts';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  const { customer, signOut } = useCustomer();

  const [open, setOpen] = useState(false);

  const [openCustomer, setOpenCustomer] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const items: INavItem[] = [
    {
      name: 'Dashboard',
      link: '/dashboard',
    },
    {
      name: 'Serviços',
      link: '/dashboard/services',
    },
    {
      name: 'Faturas',
      link: '/dashboard/invoices',
    },
    {
      name: 'Suporte',
      link: '/dashboard/tickets',
    },
    {
      name: 'Termos de Uso',
      link: '/termos',
    },
  ];

  return (
    <div className="px-8 h-14 flex items-center justify-between border-b border-black/30 dark:border-white/10">
      <div className="relative w-full">
        <nav className="flex justify-between items-center">
          <Link href="/" aria-label="TomadaHost">
            <div className="flex items-center gap-1">
              <Logotipo width={50} height={50} />
            </div>
          </Link>
          <div className="flex items-center gap-[20px]">
            <button
              className="text-black dark:text-white block xl:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <PiX size={28} /> : <PiList size={28} />}
            </button>
            <button
              className="text-black dark:text-white"
              onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
              aria-label="Modo dark"
            >
              {theme === 'dark' ? <PiSun size={24} /> : <PiMoon size={24} />}
            </button>
            <div className="relative group">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setOpenCustomer(!openCustomer)}
              >
                {customer ? (
                  <div className="flex justify-center items-center bg-gray-200 dark:bg-dark-100 w-10 h-10 rounded-full">
                    {customer.name[0]}
                  </div>
                ) : (
                  <div className="bg-gray-200 dark:bg-dark-100 w-10 h-10 rounded-full"></div>
                )}
                <PiCaretDownBold />
              </div>
              {openCustomer && (
                <div className="w-full absolute right-0 min-w-[180px] -bottom-[130px]">
                  <div className="relative flex flex-col gap-[10px] bg-gray-200 dark:bg-dark-100 rounded-md p-3">
                    <div className="absolute top-[-10px] right-10">
                      <PiCaretUpFill className="text-white" />
                    </div>

                    <Link
                      className="flex items-center gap-[10px] text-gray-900 dark:text-white hover:underline"
                      href="/dashboard/settings"
                    >
                      <PiGear size={20} /> Configurações
                    </Link>
                    <hr />
                    <button
                      className="flex items-center gap-[10px] text-red-600 hover:underline mr-auto"
                      onClick={() => signOut()}
                    >
                      <PiSignOut size={20} /> Sair da conta
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
        {open && (
          <div className="block xl:hidden absolute top-30 w-full bg-white text-black dark:bg-black dark:text-white py-10 px-5 z-30 rounded-md">
            <ul className="flex flex-col xl:hidden items-center gap-[25px]">
              {items.map((item, index) => (
                <NavItem
                  key={index}
                  {...item}
                  isOpen={openDropdown === index}
                  toggleDropdown={() => {
                    if (openDropdown === index) {
                      setOpenDropdown(null);
                    } else {
                      setOpenDropdown(index);
                    }
                  }}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
