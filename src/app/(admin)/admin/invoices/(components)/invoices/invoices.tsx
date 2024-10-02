'use client';
import { usePathname, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { Container, Pagination } from '@src/components';

import { Invoice } from '.';

import { ICustomerServiceInvoice } from '@src/interfaces';

import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';

export function Invoices() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);

  const page = searchParams.get('page') || 1;

  const [invoices, setInvoices] = useState<ICustomerServiceInvoice[]>([]);

  async function getInvoices() {
    setLoading(true);

    await apiClient
      .get(`/customers/invoices/admin?page=${page}`)
      .then(response => {
        setInvoices(response.data);

        setLoading(false);
      })
      .catch(error => {
        setInvoices([]);
      });
  }

  useEffect(() => {
    getInvoices();
  }, [page]);

  return (
    <Container>
      <h1 className="text-[22px] font-semibold">Faturas</h1>
      <p className='text-sm font-light opacity-70 mb-8'>Gerencie todas as faturas criadas de nossa plataforma.</p>
      <div className="relative bg-gray-200 dark:bg-dark-100 rounded-md overflow-x-auto overflow-y-hidden">
        <table className="w-full text-left">
          <thead className="text-[15px] text-black dark:text-white border-b border-black/30 dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-3 font-normal">
                Status
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                ID
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Serviço
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Meio de pagamento
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Valor
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Última atualização
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
            ) : invoices.length > 0 ? (
              invoices.map((invoice, index) => <Invoice key={index} {...invoice} />)
            ) : (
              <tr>
                <td colSpan={7} className="text-[14px] text-center py-4">
                  Nenhuma fatura encontrada.
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
