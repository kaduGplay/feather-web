'use client';

import { useEffect, useState } from 'react';

import { ICustomer, ICustomerServiceInvoice, IService } from '@src/interfaces';

import { apiClient } from '@src/services';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Container } from '@src/components';
import { RiLoader5Fill } from 'react-icons/ri';
import { Invoices, Manager } from '.';

interface IFormData {
  service_id: string;
  price_custom?: number;
  expires_at?: Date;
}

export function Service({ customer_id, id }: { customer_id: string; id: string }) {
  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState<ICustomer>();

  const [services, setServices] = useState<IService[]>([]);
  const [invoices, setInvoices] = useState<ICustomerServiceInvoice[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  async function onSubmit({ service_id, price_custom, expires_at }: IFormData) {
    setLoading(true);

    if (!service_id) {
      return setLoading(false);
    }

    await apiClient
      .put(`/customer/services/${id}`, {
        price_custom,
        expires_at,
      })
      .then(response => {
        toast.success('O serviço foi atualizado com sucesso!');

        setLoading(false);
      })
      .catch(error => {
        toast.error(error.response.data.message);

        setLoading(false);
      });
  }

  async function getCustomer() {
    await apiClient
      .get(`/customer/${customer_id}`)
      .then(response => {
        setCustomer(response.data);

        setLoading(false);
      })
      .catch(error => {});
  }

  async function getCustomerService() {
    await apiClient
      .get(`/customer/services/${id}`)
      .then(response => {
        setValue('service_id', response.data.service_id);
        setValue('price_custom', response.data.price_custom);
        setValue('expires_at', response.data.expires_at);

        setInvoices(response.data.customerServiceInvoice);

        setLoading(false);
      })
      .catch(error => {});
  }

  async function getServices() {
    await apiClient
      .get('/services')
      .then(response => setServices(response.data))
      .catch(error => {});
  }

  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    getCustomerService();
  }, []);

  return (
    <div className="lg:w-[800px] mx-auto">
      <Container>
        <h1 className="text-[22px] font-semibold my-8">Atualizando serviço</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[14px] md:text-[15px] font-light">
              Cliente
            </label>
            <input
              id="email"
              type="email"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light`}
              placeholder="Insira o seu e-mail"
              value={customer?.email}
              readOnly={true}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="service_id" className="text-[14px] md:text-[15px] font-light">
              ID do Serviço
            </label>
            <select
              id="service_location_id"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.service_id && 'outline-red-500'
              }`}
              disabled={true}
              {...register('service_id', { required: true })}
            >
              <option value="" selected>
                Selecione
              </option>
              {services.map((service, index) => (
                <option key={index} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.service_id && (
              <p className="text-[14px] text-red-500">
                Você precisa selecionar o serviço.
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="price_custom"
              className="text-[14px] md:text-[15px] font-light"
            >
              Preço (Opcional)
            </label>
            <input
              id="price"
              type="number"
              min={1}
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.price_custom && 'outline-red-500'
              }`}
              placeholder="Insira o preço"
              readOnly={loading}
              {...register('price_custom', { required: false })}
            />
            {errors.price_custom && (
              <p className="text-[14px] text-red-500">Você precisa inserir o preço.</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="expires_at" className="text-[14px] md:text-[15px] font-light">
              Expiração (Opcional)
            </label>
            <input
              id="expires_at"
              type="date"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.expires_at && 'outline-red-500'
              }`}
              placeholder="Insira a expiração"
              readOnly={loading}
              {...register('expires_at', { required: false })}
            />
            {errors.expires_at && (
              <p className="text-[14px] text-red-500">
                Você precisa inserir a expiração.
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Atualizar serviço"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
              </span>
            ) : (
              'Atualizar serviço'
            )}
          </button>
        </form>
        <Manager id={id} />
        <Invoices invoices={invoices} loading={loading} />
      </Container>
    </div>
  );
}
