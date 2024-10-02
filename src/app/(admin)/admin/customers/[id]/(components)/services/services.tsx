'use client';

import { Container } from '@src/components';

import { Service } from '.';

import { ICustomerService } from '@src/interfaces';

import { RiLoader5Fill } from 'react-icons/ri';
import Link from 'next/link';

export function Services({
  id,
  services,
  loading,
}: {
  id: string;
  services: ICustomerService[];
  loading: boolean;
}) {
  return (
    <Container>
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-semibold my-8">Serviços</h1>
        <Link
          className="text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300"
          aria-label="Criar serviço"
          href={`/admin/customers/${id}/services/add`}
        >
          Adicionar serviço
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
                <td colSpan={8} className="text-[14px] text-center py-4">
                  <div className="flex justify-center items-center gap-2">
                    <RiLoader5Fill className="animate-spin" size={20} /> Carregando...
                  </div>
                </td>
              </tr>
            ) : services.length > 0 ? (
              services.map((service, index) => <Service key={index} {...service} />)
            ) : (
              <tr>
                <td colSpan={8} className="text-[14px] text-center py-4">
                  Nenhum serviço encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
