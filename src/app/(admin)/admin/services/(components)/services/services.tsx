'use client';

import { useEffect, useState } from 'react';

import { Container, Pagination } from '@src/components';

import { Service } from '.';

import { IService } from '@src/interfaces';

import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function Services() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);

  const page = searchParams.get('page') || 1;

  const [services, setServices] = useState<IService[]>([]);

  async function getServices() {
    setLoading(true);

    await apiClient
      .get(`/services?page=${page}`)
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-semibold">Serviços</h1>
          <p className='text-sm font-light opacity-70 mb-8'>Gerencie todos os serviços de nossa plataforma.</p>
        </div>
        <Link
          className="text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300"
          aria-label="Criar serviço"
          href="/admin/services/create"
        >
          Criar serviço
        </Link>
      </div>
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
                Tipo
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Localidade
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Preço
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
