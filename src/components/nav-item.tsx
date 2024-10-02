'use client';

import Link from 'next/link';

import { PiCaretDown } from 'react-icons/pi';

import { AnimatePresence, motion } from 'framer-motion';

import { INavItem } from '@src/interfaces';

const variants = {
  open: { opacity: 1, x: 0, y: 10 },
  closed: { opacity: 0, y: -10, x: '-100%' },
};

export function NavItem({ name, link, children, isOpen, toggleDropdown }: INavItem) {
  if (children) {
    return (
      <li className="relative">
        <button
          className="flex items-center gap-2 text-black dark:text-white font-normal text-[15px]"
          aria-label={name}
          onClick={toggleDropdown}
        >
          {name}{' '}
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
            <PiCaretDown size={16} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              animate={isOpen === true ? 'open' : 'closed'}
              variants={variants}
              className="absolute top-10 z-40 bg-black text-white dark:bg-white -left-24 lg:-left-16 w-[320px] rounded-[8px] px-[20px] py-[20px]"
            >
              <ul className="flex flex-col gap-3">
                {children.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      aria-label={item.name}
                      onClick={toggleDropdown}
                      className="group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-white dark:bg-black dark:text-white text-black py-3 px-3 rounded-[12px]">
                          {item.icon}
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-[16px] group-hover:underline text-white dark:text-black">
                            {item.name}
                          </h1>
                          <p className="text-[11px] text-[#9E9E9E]">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    );
  } else {
    return (
      <li>
        <Link
          className="flex items-center gap-2 text-black dark:text-white font-normal text-[15px]"
          aria-label={name}
          href={link as string}
        >
          {name}
        </Link>
      </li>
    );
  }
}
