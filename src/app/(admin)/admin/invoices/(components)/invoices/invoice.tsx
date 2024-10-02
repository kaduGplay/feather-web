'use client';

import Link from 'next/link';

import { ICustomerServiceInvoice } from '@src/interfaces';

import { format } from 'date-fns';
import { useState } from 'react';
import { apiClient } from '@src/services';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { PiEye, PiHandshake, PiTrash } from 'react-icons/pi';
import { ImCancelCircle } from 'react-icons/im';
import { IoIosHourglass } from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RiRefund2Fill } from "react-icons/ri";
import { GiPistolGun } from "react-icons/gi";


export function Invoice({
  id,
  updated_at,
  customerService,
  payment_method,
  value,
  status,
}: ICustomerServiceInvoice) {
  const [loading, setLoading] = useState(false);

  async function deleteFunction() {
    setLoading(true);

    await apiClient
      .delete(`/invoices/${id}`)
      .then(response => {
        toast.success(response.data.message);

        window.location.reload();
      })
      .catch(error => {
        toast.error(error.response.data.error);
      });

    setLoading(false);
  }

  async function remove() {
    try {
      Swal.fire({
        title: 'Confirmação',
        text: 'Você tem certeza que deseja deletar esta fatura?',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#22c55e',
        denyButtonColor: '#D1D5DB',
        confirmButtonText: 'Sim, deletar',
        denyButtonText: 'Cancelar',
      }).then(async result => {
        if (result.isConfirmed) {
          setLoading(true);

          deleteFunction();
        }
      });
    } catch (error: any) {
      toast.error(error.response.data.message);

      setLoading(false);
    }
  }

  return (
    <tr className="">
      <td className="flex items-center justify-center px-6 py-4">
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
        {value.toLocaleString('pt-br', {
          currency: 'BRL',
          style: 'currency',
        })}
      </td>
      <td className="px-6 py-4">
        {updated_at ? format(new Date(updated_at), "dd/MM/yyyy 'às' HH:mm") : null}
      </td>
      <td className="flex items-center gap-2 px-6 py-4">
        <Link href={`/admin/invoices/${id}`}>
          <PiEye size={18} />
        </Link>
        <button type="button" onClick={remove} disabled={loading}>
          <PiTrash size={18} />
        </button>
      </td>
    </tr>
  );
}
