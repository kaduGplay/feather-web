'use client';

import { useEffect, useState } from 'react';

import { Container } from '@src/components';

import { LastTicket } from '.';

import { ITicket } from '@src/interfaces';

import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';

export function LastTickets() {
  const [loading, setLoading] = useState(true);

  const [tickets, setTickets] = useState<ITicket[]>([]);

  async function getTickets() {
    setLoading(true);

    await apiClient
      .get('/customers/tickets/admin?page=1&limit=5')
      .then(response => {
        setTickets(response.data);

        setLoading(false);
      })
      .catch(error => {
        setTickets([]);
      });
  }

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <Container>
      <h1 className="text-[22px] font-semibold my-8">Últimos tickets abertos</h1>
      <div className="relative bg-gray-200 dark:bg-dark-100 rounded-md overflow-x-auto overflow-y-hidden">
        <table className="w-full text-left">
          <thead className="text-[15px] text-black dark:text-white border-b border-black/30 dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-3 font-normal">
                ID
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Assunto
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Departamento
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Prioridade
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
            ) : tickets.length > 0 ? (
              tickets.map((ticket, index) => <LastTicket key={index} {...ticket} />)
            ) : (
              <tr>
                <td colSpan={7} className="text-[14px] text-center py-4">
                  Nenhum ticket encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
