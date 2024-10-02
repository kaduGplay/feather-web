'use client';

import { useEffect, useState } from 'react';

import { Container, Pagination } from '@src/components';

import { Customer } from '.';

import { ICustomer } from '@src/interfaces';

import { RiLoader5Fill } from 'react-icons/ri';

import { apiClient } from '@src/services';
import { usePathname, useSearchParams } from 'next/navigation';

export function Customers() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);

  const page = searchParams.get('page') || 1;

  const [customers, setCustomers] = useState<ICustomer[]>([]);

  async function getCustomers() {
    setLoading(true);

    await apiClient
      .get(`/customers?page=${page}`)
      .then(response => {
        setCustomers(response.data);

        setLoading(false);
      })
      .catch(error => {
        setCustomers([]);
      });
  }

  useEffect(() => {
    getCustomers();
  }, [page]);

  return (
    <Container>
      <h1 className="text-[22px] font-semibold">Clientes</h1>
      <p className='text-sm font-light opacity-70 mb-8'>Tenha a visão geral dos clientes da plataforma.</p>
      <div className="relative bg-gray-200 dark:bg-dark-100 rounded-md overflow-x-auto overflow-y-hidden">
        <table className="w-full text-left">
          <thead className="text-[15px] text-black dark:text-white border-b border-black/30 dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-3 font-normal">
                ID
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                E-mail
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Cargo
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Última atualização
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Status
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-[14px] text-center py-4">
                  <div className="flex justify-center items-center gap-2">
                    <RiLoader5Fill className="animate-spin" size={20} /> Carregando...
                  </div>
                </td>
              </tr>
            ) : customers.length > 0 ? (
              customers.map((customer, index) => <Customer key={index} {...customer} />)
            ) : (
              <tr>
                <td colSpan={7} className="text-[14px] text-center py-4">
                  Nenhum cliente encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination pathname={pathname} page={page} />
    </Container>
  );
}
