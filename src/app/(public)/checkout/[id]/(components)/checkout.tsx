'use client';

import { CartPix, Container } from '@src/components';

import { IService } from '@src/interfaces';
import { apiClient } from '@src/services';

import { useEffect, useState } from 'react';

import { RiLoader5Fill } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { Coupon } from '.';

import { MdOutlinePix } from "react-icons/md";
import { SiMercadopago } from "react-icons/si";
import { PiShoppingCartSimpleLight } from 'react-icons/pi';

interface IFormData {
  service_id: string;
  payment_method: 'PIX' | 'MERCADO_PAGO' | 'PAYPAL';
  coupon_code?: string;
}

export function Checkout({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [loadingPay, setLoadingPay] = useState(true);

  const [service, setService] = useState<IService | null>();

  const [qrCode, setQrCode] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [pixOpen, setPixOpen] = useState(false);

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IFormData>({
    defaultValues: {
      service_id: id,
      payment_method: 'PIX',
    },
  });

  const payment_method = watch('payment_method');

  async function onSubmit({ service_id, payment_method, coupon_code }: IFormData) {
    setLoadingPay(true);

    if (!service_id || !payment_method) {
      toast.error('Você precisa preencher os campos.');

      return setLoadingPay(false);
    }

    await apiClient
      .post('/checkout', {
        service_id,
        payment_method,
        coupon_code,
      })
      .then(response => {
        toast.success('O pagamento foi gerado com sucesso.');

        if (payment_method === 'PIX') {
          setQrCode(response.data.pix.qr_code);
          setQrCodeImage(response.data.pix.qr_code_base64);

          return setPixOpen(true);
        }

        window.location.href = response.data.url;
      })
      .catch(error => {
        if (error.response.status === 401) {
          toast.error('Você precisa estar logado.');

          return (window.location.href = '/login');
        }

        toast.error(error.response.data.error);

        return setLoadingPay(false);
      });
  }

  async function getService() {
    setLoading(true);
    setLoadingPay(true);

    await apiClient
      .get(`/services/${id}`)
      .then(response => {
        setService(response.data);

        setLoading(false);
        setLoadingPay(false);
      })
      .catch(error => {
        window.location.href = '/';
      });
  }

  useEffect(() => {
    getService();
  }, [id]);

  function handleCoupon(code: string) {
    setValue('coupon_code', code);
  }

  useEffect(() => {
    if (service) {
      setValue('service_id', service.id);

      setTotal(service.price);
      setSubtotal(service.price);
    }
  }, [service]);

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
            }}
            closeCart={close}
          />
        </AnimatePresence>
      )}
      <Container>
        <div className="relative flex flex-col bg-light-100 dark:bg-dark-100 rounded-md py-[30px] px-[50px] mt-[30px] gap-3">
          <div className="flex flex-col justify-center items-center text-center pb-[50px]">
            <h1 className="text-[26px] text-black dark:text-white font-light">
              Estamos quase lá! Conclua seu pedido!
            </h1>
            <p className=" lg:w-[600px] text-[#5E5E5E] font-light">
              Nosso sistema recebeu seu pedido e está aguardando o pagamento para dar o UP que seu projeto precisa!
            </p>
          </div>
          <div className="mt-8">
            {loading ? (
              <div className="flex justify-center items-center gap-2 col-span-3">
                <RiLoader5Fill className="animate-spin" size={20} /> Carregando...
              </div>
            ) : service ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
                <div className="flex flex-col gap-[20px] lg:col-span-2 ">
                  <div className="bg-white dark:bg-black p-[20px] rounded-md h-fit">
                    <h1 className="text-[20px] text-black dark:text-white font-light">
                      Serviço referente: {service.name}
                    </h1>
                    <p className='text-xs font-light text-black dark:text-white mt-5'>Especificações:</p>
                    <ul className="flex flex-col gap-1 ml-1">
                      {JSON.parse(service.features).map(
                        (feature: string, index: number) => (
                          <li key={index}>
                            <p className="text-[14px] text-black dark:text-gray-200">
                              {feature}
                            </p>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-black p-[20px] rounded-md h-fit">
                    <h1 className="text-[20px] text-black dark:text-white font-semibold">
                      Desconto
                    </h1>
                    <Coupon
                      service={service}
                      setDiscount={setDiscount}
                      setTotal={setTotal}
                      setSubtotal={setSubtotal}
                      handleCoupon={handleCoupon}
                      loadingPay={loadingPay}
                    />
                  </div>
                  <div className="bg-white dark:bg-black p-[20px] rounded-md h-fit">
                    <h1 className="text-[20px] text-black dark:text-white font-semibold">
                      Forma de pagamento
                    </h1>
                    <div className="flex items-center gap-[10px] mt-5">
                      <button
                        disabled={payment_method === 'PIX'}
                        className={`${payment_method === 'PIX' ? "bg-black text-white dark:bg-white dark:text-black cursor-not-allowed" : "bg-transparent"} border border-black/50 dark:border-white/50 w-40 py-2 rounded-md flex items-center justify-center gap-2 transition-all duration-300 ease-in-out`}
                        onClick={() => {
                          if (payment_method === 'PIX' || loading || loadingPay) return;

                          setValue('payment_method', 'PIX');
                          toast.success('O meio de pagamento foi alterado para Pix!');
                        }}
                      >
                        <span><MdOutlinePix className="text-xl" /></span>
                        Pix
                      </button>
                      <button
                        disabled={payment_method === 'MERCADO_PAGO'}
                        className={`${payment_method === 'MERCADO_PAGO' ? "bg-black text-white dark:bg-white dark:text-black cursor-not-allowed" : "bg-transparent"} border border-black/50 dark:border-white/50 w-40 py-2 rounded-md flex items-center justify-center gap-2 transition-all duration-300 ease-in-out`}
                        onClick={() => {
                          if (payment_method === 'MERCADO_PAGO' || loading || loadingPay) return;

                          setValue('payment_method', 'MERCADO_PAGO');
                          toast.success('O meio de pagamento foi alterado para Mercado Pago!');
                        }}
                      >
                        <span><SiMercadopago className="text-xl" /></span>
                        Mercado Pago
                      </button>
                    </div>
                  </div>
                </div>
                <form
                  className="bg-white h-fit dark:bg-black p-[20px] rounded-md"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h1 className="text-[20px] text-black dark:text-white font-semibold">
                    Resumo do pedido
                  </h1>
                  <div className="flex justify-between items-center mt-5">
                    <p>{service.name}</p>
                    <p>
                      {service.price.toLocaleString('pt-br', {
                        currency: 'BRL',
                        style: 'currency',
                      })}
                    </p>
                  </div>
                  <hr className="my-5" />
                  <div>
                    <h2 className="text-[14px]">Pagamento reincidente</h2>
                    <div className="flex justify-between items-center">
                      <p>Mensal</p>
                      <p>
                        {service.price.toLocaleString('pt-br', {
                          currency: 'BRL',
                          style: 'currency',
                        })}
                      </p>
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div className="mb-5">
                    <div className="flex justify-between items-center">
                      <p>Total</p>
                      <p>
                        {total.toLocaleString('pt-br', {
                          currency: 'BRL',
                          style: 'currency',
                        })}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Desconto</p>
                      <p>
                        -{' '}
                        {discount.toLocaleString('pt-br', {
                          currency: 'BRL',
                          style: 'currency',
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-[14px]">Pagamento hoje</h2>
                    <p className="text-[20px] font-semibold">
                      {subtotal.toLocaleString('pt-br', {
                        currency: 'BRL',
                        style: 'currency',
                      })}
                    </p>
                  </div>
                  <button
                    type="submit"
                    aria-label="Finalizar pedido"
                    disabled={loading || loadingPay}
                    className="mt-5 w-full flex items-center justify-center border border-black/30 dark:border-white/10 py-3 rounded-md scale-90 transition-all duration-300 ease-in-out bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                    <span className="mr-2"><PiShoppingCartSimpleLight fontWeight={100}
                      className="text-2xl" /></span>
                    Finalizar Pedido
                  </button>
                </form>
              </div>
            ) : (
              <p className="flex mx-auto text-center lg:col-span-2 xl:col-span-3">
                Este serviço não foi encontrado.
              </p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
