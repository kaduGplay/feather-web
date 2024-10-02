'use client';

import { useEffect, useState } from 'react';

import { Container, Pagination } from '@src/components';

import { Service } from '.';

import { ICustomerService } from '@src/interfaces';

import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';
import { usePathname, useSearchParams } from 'next/navigation';

export function Services() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);

  const page = searchParams.get('page') || 1;

  const [services, setServices] = useState<ICustomerService[]>([]);

  async function getServices() {
    setLoading(true);

    await apiClient
      .get(`/customers/services?page=${page}`)
      .then(response => {
        setServices(response.data);

        setLoading(false);
      })
      .catch(error => {
        console.log(error.response.data);
        setServices([]);
      });
  }

  useEffect(() => {
    getServices();
  }, [page]);

  return (
    <Container>
      <h1 className="text-[22px] font-semibold my-8">Seus serviços</h1>
      <div className="relative bg-white dark:bg-black rounded-md overflow-x-auto overflow-y-hidden">
        <table className="w-full text-left">
          <thead className="text-[15px] text-black dark:text-white border-b border-black/30 dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-3 font-normal">
                ID
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Serviço
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Localidade
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Preço
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Expiração
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
            ) : services.length > 0 ? (
              services.map((service, index) => <Service key={index} {...service} />)
            ) : (
              <tr>
                <td colSpan={7} className="text-[14px] text-center py-4">
                  Nenhum serviço encontrado.
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
