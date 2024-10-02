'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Container } from '@src/components';

import { Invoices, Manager } from '.';
import { apiClient } from '@src/services';
import { ICustomerService, ICustomerServiceInvoice } from '@src/interfaces';
import { format } from 'date-fns';

export function Service({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);

  const [service, setService] = useState<ICustomerService | null>();
  const [invoices, setInvoices] = useState<ICustomerServiceInvoice[]>([]);

  async function getCustomerService() {
    setLoading(true);

    await apiClient
      .get(`/customer/services/${id}`)
      .then(response => {
        setService(response.data);

        setInvoices(response.data.customerServiceInvoice);

        setLoading(false);
      })
      .catch(error => {});
  }

  useEffect(() => {
    getCustomerService();
  }, [id]);

  return (
    <div className="mx-auto">
      <Container>
        <div>
          <div>
            <h1 className="text-[22px] font-semibold mb-8">Visualizando serviço</h1>
            <div className="bg-white dark:bg-black p-8 rounded-md flex flex-col gap-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div>
                  <h1 className="text-gray-500 font-semibold">Plano:</h1>
                  <p>{loading ? '...' : service?.service.name}</p>
                </div>
                <div>
                  <h1 className="text-gray-500 font-semibold">Vencimento:</h1>
                  <p>
                    {loading
                      ? '...'
                      : service?.expires_at
                      ? format(new Date(service.expires_at), "dd/MM/yyyy 'às' HH:mm")
                      : null}
                  </p>
                </div>
                <div>
                  <h1 className="text-gray-500 font-semibold">Status:</h1>
                  <p>
                    {' '}
                    {loading
                      ? '...'
                      : (service?.status == 'PENDING' && 'Pagamento pendente') ||
                        (service?.status == 'ACTIVE' && 'Ativo') ||
                        (service?.status == 'SUSPENDED' && 'Suspenso') ||
                        (service?.status == 'CANCELED' && 'Cancelado') ||
                        (service?.status == 'WAITING_FOR_DELIVERY' &&
                          'Aguardando entrega') ||
                        (service?.status == 'DELIVERED_AND_ACTIVE' && 'Entregue e ativo')}
                  </p>
                </div>
                <div>
                  <h1 className="text-gray-500 font-semibold">Preço:</h1>
                  <p>
                    {loading
                      ? '...'
                      : service?.price_custom
                      ? service.price_custom.toLocaleString('pt-br', {
                          currency: 'BRL',
                          style: 'currency',
                        })
                      : service?.service.price.toLocaleString('pt-br', {
                          currency: 'BRL',
                          style: 'currency',
                        })}
                  </p>
                </div>
                <div>
                  <h1 className="text-gray-500 font-semibold">Região:</h1>
                  <p>{loading ? '...' : service?.service.serviceLocation.name}</p>
                </div>
                <div>
                  <h1 className="text-gray-500 font-semibold">Criado em:</h1>
                  <p>
                    {loading
                      ? '...'
                      : service?.created_at
                      ? format(new Date(service.created_at), "dd/MM/yyyy 'às' HH:mm")
                      : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Manager id={id} />
          <div className="my-8">
            <h1 className="text-[22px] font-semibold mb-8">Dados do serviço</h1>
            <div className="bg-white dark:bg-black p-8 rounded-md flex flex-col gap-12">
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="username"
                    className="text-[14px] md:text-[15px] font-light"
                  >
                    Usuário
                  </label>
                  <input
                    id="username"
                    type="text"
                    className={`bg-light-100 dark:bg-dark-100 p-3 rounded-lg text-[14px] md:text-[15px] font-light`}
                    placeholder="Usuário"
                    defaultValue={loading ? '...' : service?.customerServiceDetail.user}
                    readOnly={true}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-[14px] md:text-[15px] font-light"
                  >
                    Senha
                  </label>
                  <input
                    id="password"
                    type="text"
                    className={`bg-light-100 dark:bg-dark-100 p-3 rounded-lg text-[14px] md:text-[15px] font-light`}
                    placeholder="Senha"
                    defaultValue={
                      loading ? '...' : service?.customerServiceDetail.password
                    }
                    readOnly={true}
                  />
                </div>
                <Link
                  className={`w-full text-[14px] text-center lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[15px] px-[25px] rounded-[15px] transition-all ease-in-out duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label="Painel de Controle"
                  href="/"
                  target="_blank"
                >
                  Painel de Controle
                </Link>
              </div>
            </div>
          </div>
          <Invoices invoices={invoices} loading={loading} />
        </div>
      </Container>
    </div>
  );
}
