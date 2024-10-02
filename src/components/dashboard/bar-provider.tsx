'use client'

import { TfiDashboard } from "react-icons/tfi";
import { PiHandCoinsThin } from "react-icons/pi";
import { IBarItem } from "@src/interfaces";
import { BarItem } from "./bar-item";
import { MdElectricalServices } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaBook } from "react-icons/fa";

import Link from "next/link";

export function BarProvider({ children }: { children: React.ReactNode }) {

    const items: IBarItem[] = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: <TfiDashboard fontWeight={100} className='text-xl mr-2' />
        },
        {
            name: 'Serviços',
            link: '/dashboard/services',
            icon: <MdElectricalServices fontWeight={100} className='text-xl mr-2' />
        },
        {
            name: 'Faturas',
            link: '/dashboard/invoices',
            icon: <PiHandCoinsThin fontWeight={100} className='text-xl mr-2' />
        },
        {
            name: 'Suporte',
            link: '/dashboard/tickets',
            icon: <RiCustomerService2Line fontWeight={100} className='text-xl mr-2' />
        },
    ];

    return (
        <>
            <div className="flex px-2 lg:px-20 py-8 gap-8" style={{ height: 'calc(100vh - 56px)' }}>
                <div className="hidden md:block bg-gray-200 dark:bg-dark-100 border border-black/30 dark:border-white/10 w-60 rounded-md overflow-auto">
                    <div className="h-full py-10 flex flex-col gap-2 justify-between">
                        <ul className="h-full flex flex-col gap-2 justify-between">
                            <div>
                                {items.map((item, index) => (
                                    <BarItem key={index} {...item} />
                                ))}
                            </div>
                            <li className="relative flex items-center justify-center px-4">
                                <Link
                                    href={'/termos'}
                                    className={`w-full bar-link py-2 px-3 rounded-md text-sm font-light flex items-center text-black/80 dark:text-white/60 transition-all duration-300 ease-in-out hover:dark:text-white hover:text-black`}
                                >
                                    <span><FaBook fontWeight={100} className='text-xl mr-2' /></span>
                                    Termos de Uso
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <main className="w-full py-5 bg-gray-200 dark:bg-dark-100 border border-black/30 dark:border-white/10 rounded-md overflow-x-hidden overflow-y-auto">
                    {children}
                </main>
            </div>
        </>
    );
}
