'use client';

import { useEffect, useState } from 'react';

import { Container } from '@src/components';

import { Services } from '.';

import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';
import { ICustomerService, ICustomerServiceInvoice } from '@src/interfaces';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function Invoice({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);

  const [invoice, setInvoice] = useState<ICustomerServiceInvoice | null>();
  const [service, setService] = useState<ICustomerService | null>();

  async function getInvoice() {
    await apiClient
      .get(`/customer/invoices/${id}`)
      .then(response => {
        setInvoice(response.data);
        setService(response.data.customerService);

        setLoading(false);
      })
      .catch(error => {});
  }

  async function pay() {
    setLoading(true);

    await apiClient
      .get(`/invoices/pay/${id}`)
      .then(response => {
        toast.success('Fatura paga com sucesso.');

        window.location.reload();
      })
      .catch(error => {
        toast.error(error.response.data.message);

        setLoading(false);
      });
  }

  useEffect(() => {
    getInvoice();
  }, [id]);

  return (
    <div className="lg:w-[800px] mx-auto bg-gray-200 dark:bg-dark-100 p-2 rounded-md">
      <Container>
        <h1 className="text-[22px] font-semibold mb-8">Visualizando fatura</h1>
        <div className="bg-white dark:bg-black p-8 rounded-md flex flex-col gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <h1 className="text-gray-500 font-semibold">N° da Fatura:</h1>
              <p>#{loading ? '...' : invoice?.id.split('-')[0]}</p>
            </div>
            <div>
              <h1 className="text-gray-500 font-semibold">Data da Fatura:</h1>
              <p>
                {loading
                  ? '...'
                  : invoice?.created_at
                  ? format(new Date(invoice.created_at), "dd/MM/yyyy 'às' HH:mm")
                  : null}
              </p>
            </div>
            <div>
              <h1 className="text-gray-500 font-semibold">Vencimento da Fatura:</h1>
              <p>
                {loading
                  ? '...'
                  : invoice?.expires_at
                  ? format(new Date(invoice.expires_at), "dd/MM/yyyy 'às' HH:mm")
                  : null}
              </p>
            </div>
            <div>
              <h1 className="text-gray-500 font-semibold">Valor da Fatura:</h1>
              <p>
                {loading
                  ? '...'
                  : invoice?.value
                  ? invoice.value.toLocaleString('pt-br', {
                      currency: 'BRL',
                      style: 'currency',
                    })
                  : null}
              </p>
            </div>
            <div>
              <h1 className="text-gray-500 font-semibold">Meio de pagamento:</h1>
              <p>{loading ? '...' : invoice?.payment_method}</p>
            </div>
            <div>
              <h1 className="text-gray-500 font-semibold">Status da Fatura:</h1>
              <p>
                {loading
                  ? '...'
                  : (invoice?.status == 'PENDING' && 'Pagamento pendente') ||
                    (invoice?.status == 'PAID' && 'Pago') ||
                    (invoice?.status == 'CANCELED' && 'Cancelado') ||
                    (invoice?.status == 'IN_ANALYSIS' && 'Em Análise') ||
                    (invoice?.status == 'REFUNDED' && 'Reembolsado') ||
                    (invoice?.status == 'FRAUD' && 'Fraude')}
              </p>
            </div>
          </div>
        </div>
        <Services service={service} loading={loading} />
        <button
          type="button"
          className={`w-full text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label="Pagar fatura"
          onClick={pay}
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
            </span>
          ) : (
            'Marcar como paga'
          )}
        </button>
      </Container>
    </div>
  );
}
