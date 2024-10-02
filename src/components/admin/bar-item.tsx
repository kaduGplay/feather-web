'use client';

import { IBarItem } from '@src/interfaces';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
export function BarItem({ name, link, icon }: IBarItem) {
    const pathname = usePathname()

    return (
        <li className="relative flex items-center justify-center px-4">
            <Link href={`${link}`} className={`w-full bar-link py-2 px-3 rounded-md font-light flex items-center text-black/80 dark:text-white/60 transition-all duration-300 ease-in-out hover:dark:text-white hover:text-black ${pathname === link ? 'active' : ''}`}>
                <span>{icon}</span>
                {name}
            </Link>
        </li>
    );
}
