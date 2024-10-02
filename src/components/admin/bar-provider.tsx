'use client'

import {TfiDashboard} from "react-icons/tfi";
import {GoPeople} from "react-icons/go";
import {PiHandCoinsThin} from "react-icons/pi";
import {BiSolidCoupon} from "react-icons/bi";
import {CiCreditCard2} from "react-icons/ci";
import {IoPeople} from "react-icons/io5";
import { IBarItem } from "@src/interfaces";
import { BarItem } from "./bar-item";
import { IoMdPin } from "react-icons/io";
import { MdElectricalServices } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";

export function BarProvider({children}: { children: React.ReactNode }) {

    const items: IBarItem[] = [
        {
            name: 'Dashboard',
            link: '/admin',
            icon: <TfiDashboard fontWeight={100} className='text-xl mr-2'/>
        },
        {
            name: 'Clientes',
            link: '/admin/customers',
            icon: <GoPeople fontWeight={100} className='text-xl mr-2'/>
        },
        {
            name: 'Localizações',
            link: '/admin/locations',
            icon: <IoMdPin fontWeight={100} className='text-xl mr-2'/>
        },
        {
            name: 'Serviços',
            link: '/admin/services',
            icon: <MdElectricalServices fontWeight={100} className='text-xl mr-2'/>
        },
        {
            name: 'Faturas',
            link: '/admin/invoices',
            icon: <PiHandCoinsThin fontWeight={100} className='text-xl mr-2'/>
        },
        {
            name: 'Cupons',
            link: '/admin/coupons',
            icon: <BiSolidCoupon fontWeight={100} className='text-xl mr-2'/>
        },
        {
            name: 'Suporte',
            link: '/admin/tickets',
            icon: <RiCustomerService2Line fontWeight={100} className='text-xl mr-2'/>
        },
    ];

    return (
        <>
            <div className="flex" style={{height: 'calc(100vh - 56px)'}}>
                <div className="hidden md:block border-r-[1px] border-black/30 dark:border-white/10 w-60 overflow-auto"
                     style={{height: 'calc(100vh - 56px)'}}>
                    <div className="py-10">
                        <ul className="flex flex-col gap-2">
                            {items.map((item, index) => (
                                <BarItem key={index} {...item} />
                            ))}
                        </ul>
                    </div>
                </div>
                <main className="w-full py-5 px-10 overflow-x-hidden overflow-y-auto">
                    {children}
                </main>
            </div>
        </>
    );
}
