'use client';

import Link from 'next/link';

import { useState } from 'react';

import { Container, Logo, Logotipo, NavItem } from '.';

import { useTheme } from 'next-themes';

import { INavItem } from '@src/interfaces';

import { PiList, PiMoon, PiSun, PiX } from 'react-icons/pi';
import {
  TbBrandDiscord,
  TbBrandMinecraft,
  TbBrandPython,
  TbCar,
  TbDatabase,
  TbRadioactive,
  TbServer,
  TbServerBolt,
} from 'react-icons/tb';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const items: INavItem[] = [
    {
      name: 'Hospedagem',
      children: [
        {
          icon: <TbBrandMinecraft size={32} />,
          name: 'Hospedagem Minecraft',
          description:
            'Hospede seus servidores de Minecraft com alta velocidade e alta memória.',
          link: '/minecraft',
        },
      ],
    },
    {
      name: 'Aplicações',
      children: [
        {
          icon: <TbBrandDiscord size={24} />,
          name: 'Hospedagem JS',
          description: 'Hospede seus bots de discord com um amplo web painel.',
          link: '/bot-js',
        },
        {
          icon: <TbBrandPython size={24} />,
          name: 'Hospedagem PY',
          description: 'Hospede seus bots de discord em python com um amplo web painel.',
          link: '/bot-py',
        },
      ],
    },
    {
      name: 'Servidores',
      children: [
        {
          icon: <TbServer size={24} />,
          name: 'Servidor VPS',
          description: 'Servidores em nuvem para hospedar oque você quiser.',
          link: '/vps',
        },
        {
          icon: <TbServerBolt size={24} />,
          name: 'Servidor Dedicados',
          description: 'Servidores de alta potencia bom para baremetal.',
          link: '/servidores-dedicado',
        },
      ],
    },
    {
      name: 'Precisa de Ajuda ?',
      link: 'https://discord.gg/featherhost',
    },
  ];

  return (
    <Container>
      <div className="relative z-50">
        <nav className="flex justify-between items-center py-5">
          <Link href="/" aria-label="FeatherHost">
            <div className="flex items-center gap-1">
              <Logotipo width={80} height={80} />
            </div>
          </Link>
          <ul className="hidden xl:flex items-center gap-[50px]">
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
          <div className="flex items-center gap-[15px]">
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
            <Link
              className="text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300"
              aria-label="Área do Cliente"
              href="/login"
            >
              Área do Cliente
            </Link>
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
    </Container>
  );
}
