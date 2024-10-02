'use client';

import { useEffect, useState } from 'react';

import { Container } from '@src/components';

import { LastService } from '.';

import { ICustomerService } from '@src/interfaces';

import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';

export function LastServices() {
  const [loading, setLoading] = useState(true);

  const [services, setServices] = useState<ICustomerService[]>([]);

  async function getServices() {
    setLoading(true);

    await apiClient
      .get('/customers/services?page=1&limit=5')
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
  }, []);

  return (
    <Container>
      <h1 className="text-[22px] font-semibold my-8">Últimos serviços ativos</h1>
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
              services.map((service, index) => <LastService key={index} {...service} />)
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
    </Container>
  );
}
