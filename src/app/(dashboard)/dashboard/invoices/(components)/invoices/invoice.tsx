import Link from 'next/link';

import { ICustomerServiceInvoice } from '@src/interfaces';

import { format } from 'date-fns';
import { PiEye, PiHandshake } from 'react-icons/pi';
import { GiPistolGun } from 'react-icons/gi';
import { RiRefund2Fill } from 'react-icons/ri';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { ImCancelCircle } from 'react-icons/im';
import { IoIosHourglass } from 'react-icons/io';

export function Invoice({
  id,
  updated_at,
  customerService,
  value,
  payment_method,
  status,
}: ICustomerServiceInvoice) {
  return (
    <tr className="text-[14px]">

      <td className="px-6 py-4">
        {(status == 'PENDING' &&
          <>
            <div className="relative group inline-block">
              <button className="focus:outline-none">
                <IoIosHourglass fontWeight={100} className='text-3xl text-yellow-500' />
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform scale-95 group-hover:scale-100">
                <div className="bg-white dark:bg-black text-black dark:text-white text-sm py-2 px-4 rounded-md shadow-lg">
                  Pendente
                </div>
                <div className="w-3 h-3 bg-gray-200 dark:bg-black rotate-45 transform translate-y-1 mx-auto"></div>
              </div>
            </div>
          </>
        ) ||
          (status == 'PAID' &&
            <>
              <div className="relative group inline-block">
                <button className="focus:outline-none">
                  <PiHandshake fontWeight={100} className='text-3xl text-green-500' />
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform scale-95 group-hover:scale-100">
                  <div className="bg-white dark:bg-black text-black dark:text-white text-sm py-2 px-4 rounded-md shadow-lg">
                    Pago
                  </div>
                  <div className="w-3 h-3 bg-gray-200 dark:bg-black rotate-45 transform translate-y-1 mx-auto"></div>
                </div>
              </div>
            </>
          ) ||
          (status == 'CANCELED' &&
            <>
              <div className="relative group inline-block">
                <button className="focus:outline-none">
                  <ImCancelCircle fontWeight={100} className='text-3xl text-red-500' />
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform scale-95 group-hover:scale-100">
                  <div className="bg-white dark:bg-black text-black dark:text-white text-sm py-2 px-4 rounded-md shadow-lg">
                    Cancelado
                  </div>
                  <div className="w-3 h-3 bg-gray-200 dark:bg-black rotate-45 transform translate-y-1 mx-auto"></div>
                </div>
              </div>
            </>
          ) ||
          (status == 'IN_ANALYSIS' &&
            <>
              <div className="relative group inline-block">
                <button className="focus:outline-none">
                  <HiMagnifyingGlass fontWeight={100} className='text-3xl text-orange-500' />
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform scale-95 group-hover:scale-100">
                  <div className="bg-white dark:bg-black text-black dark:text-white text-sm py-2 px-4 rounded-md shadow-lg">
                    Em Análise
                  </div>
                  <div className="w-3 h-3 bg-gray-200 dark:bg-black rotate-45 transform translate-y-1 mx-auto"></div>
                </div>
              </div>
            </>
          ) ||
          (status == 'REFUNDED' &&
            <>
              <div className="relative group inline-block">
                <button className="focus:outline-none">
                  <RiRefund2Fill fontWeight={100} className='text-3xl text-red-500' />
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform scale-95 group-hover:scale-100">
                  <div className="bg-white dark:bg-black text-black dark:text-white text-sm py-2 px-4 rounded-md shadow-lg">
                    Reembolsado
                  </div>
                  <div className="w-3 h-3 bg-gray-200 dark:bg-black rotate-45 transform translate-y-1 mx-auto"></div>
                </div>
              </div>
            </>
          ) ||
          (status == 'FRAUD' &&
            <>
              <div className="relative group inline-block">
                <button className="focus:outline-none">
                  <GiPistolGun fontWeight={100} className='text-3xl text-red-500' />
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform scale-95 group-hover:scale-100">
                  <div className="bg-white dark:bg-black text-black dark:text-white text-sm py-2 px-4 rounded-md shadow-lg">
                    Fraude
                  </div>
                  <div className="w-3 h-3 bg-gray-200 dark:bg-black rotate-45 transform translate-y-1 mx-auto"></div>
                </div>
              </div>
            </>
          )}
      </td>
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        #{id.split('-')[0]}
      </th>
      <td className="px-6 py-4">{customerService.service.name}</td>
      <td className="px-6 py-4">{payment_method}</td>
      <td className="px-6 py-4">
        {updated_at ? format(new Date(updated_at), "dd/MM/yyyy 'às' HH:mm") : null}
      </td>
      <td className="flex items-center gap-2 px-6 py-4">
        <Link href={`/dashboard/invoices/${id}`}>
          <PiEye size={18} />
        </Link>
      </td>
    </tr>
  );
}
