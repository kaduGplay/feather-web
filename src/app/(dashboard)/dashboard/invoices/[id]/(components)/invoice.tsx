'use client';

import { useEffect, useState } from 'react';

import { CartPix, Container } from '@src/components';

import { Services } from '.';

import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';
import { ICustomerService, ICustomerServiceInvoice } from '@src/interfaces';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

export function Invoice({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [loadingPay, setLoadingPay] = useState(true);

  const [invoice, setInvoice] = useState<ICustomerServiceInvoice | null>();
  const [service, setService] = useState<ICustomerService | null>();

  const [qrCode, setQrCode] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [pixOpen, setPixOpen] = useState(false);

  async function getInvoice() {
    await apiClient
      .get(`/customer/invoices/${id}`)
      .then(response => {
        setInvoice(response.data);
        setService(response.data.customerService);

        setLoading(false);
        setLoadingPay(false);
      })
      .catch(error => {});
  }

  async function pay() {
    setLoadingPay(true);

    await apiClient
      .get(`/customer/invoices/pay/${id}`)
      .then(response => {
        toast.success('O pagamento foi gerado com sucesso.');

        console.log(response.data);

        if (invoice?.payment_method === 'PIX') {
          setQrCode(response.data.pix.qr_code);
          setQrCodeImage(response.data.pix.qr_code_base64);

          return setPixOpen(true);
        }

        window.location.href = response.data.url;
      })
      .catch(error => {
        toast.error(error.response.data.message);

        setLoadingPay(false);
      });
  }

  useEffect(() => {
    getInvoice();
  }, [id]);

  return (
    <>
      {pixOpen && (
        <AnimatePresence initial={false}>
          <CartPix
            pixKey={qrCode}
            pixCode={qrCodeImage}
            close={() => {
              close();
              setPixOpen(false);
              setLoadingPay(false);
            }}
            closeCart={close}
          />
        </AnimatePresence>
      )}
      <div className="mx-auto">
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
                      (invoice?.status == 'IN_ANALYSIS' && 'Em analise') ||
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
            aria-label="Pagar"
            onClick={pay}
            disabled={loadingPay || invoice?.status !== 'PENDING'}
          >
            {loadingPay ? (
              <span className="flex justify-center items-center gap-2">
                <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
              </span>
            ) : (
              'Pagar'
            )}
          </button>
        </Container>
      </div>
    </>
  );
}
