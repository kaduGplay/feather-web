'use client';

import { Service } from '.';

import { ICustomerService } from '@src/interfaces';

import { RiLoader5Fill } from 'react-icons/ri';

export function Services({
  service,
  loading,
}: {
  service: ICustomerService | null | undefined;
  loading: boolean;
}) {
  return (
    <div>
      <h1 className="text-[22px] font-semibold my-8">Serviço</h1>
      <div className="relative bg-white dark:bg-black rounded-md overflow-x-auto overflow-y-hidden">
        <table className="w-full text-left">
          <thead className="text-[15px] text-black dark:text-white">
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
            ) : service ? (
              <Service {...service} />
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
    </div>
  );
}
