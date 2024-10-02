'use client';

import { useEffect, useState } from 'react';

import { Container } from '@src/components';

import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';
import toast from 'react-hot-toast';
import ReactInputMask from 'react-input-mask';
import { ICustomerService, ICustomerServiceInvoice } from '@src/interfaces';
import { Invoices, Services } from '.';

interface IFormData {
  name: string;
  document_type: 'CPF' | 'CNPJ';
  document: string;
  email: string;
  password?: string;
}

export function Customer({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);

  const [services, setServices] = useState<ICustomerService[]>([]);
  const [invoices, setInvoices] = useState<ICustomerServiceInvoice[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      document_type: 'CPF',
    },
  });

  const documentType = watch('document_type');

  async function onSubmit({ name, document_type, document, email, password }: IFormData) {
    setLoading(true);

    if (!name || !document_type || !document || !email) {
      return setLoading(false);
    }

    await apiClient
      .put(`/customers/${id}`, {
        name,
        document,
        email,
        password,
      })
      .then(response => {
        toast.success('O cliente foi atualizado com sucesso!');

        setLoading(false);
      })
      .catch(error => {
        toast.error(error.response.data.message);

        setLoading(false);
      });
  }

  async function getCustomer() {
    await apiClient
      .get(`/customer/${id}`)
      .then(response => {
        setValue('name', response.data.name);
        setValue('document_type', response.data.customerDocument.document_type);
        setValue('document', response.data.customerDocument.document);
        setValue('email', response.data.email);

        setServices(response.data.customerService);
        setInvoices(response.data.customerServiceInvoice);

        setLoading(false);
      })
      .catch(error => {});
  }

  useEffect(() => {
    getCustomer();
  }, [id]);

  return (
    <div>
      <div className="lg:w-[800px] mx-auto bg-gray-200 dark:bg-dark-100 p-2 rounded-md">
        <Container>
          <h1 className="text-[22px] font-semibold my-8">Editando cliente</h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="name" className="text-[14px] md:text-[15px] font-light">
                Nome
              </label>
              <input
                id="name"
                type="text"
                className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                  errors.name && 'outline-red-500'
                }`}
                placeholder="Insira o nome"
                readOnly={loading}
                {...register('name', { required: true })}
              />
              {errors.name && (
                <p className="text-[14px] text-red-500">Você precisa inserir o nome.</p>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="document_type"
                  className="text-[14px] md:text-[15px] font-light"
                >
                  Tipo do documento
                </label>
                <select
                  id="document_type"
                  className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                    errors.document_type && 'outline-red-500'
                  }`}
                  disabled={loading}
                  {...register('document_type', { required: true })}
                >
                  <option value="" selected>
                    Selecione
                  </option>
                  <option value="CPF">Pessoa Física</option>
                  <option value="CNPJ">Pessoa Jurídica</option>
                </select>
                {errors.document_type && (
                  <p className="text-[14px] text-red-500">
                    Você precisa selecionar o tipo do documento.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="document"
                  className="text-[14px] md:text-[15px] font-light"
                >
                  Documento
                </label>
                <ReactInputMask
                  id="document"
                  type="text"
                  mask={documentType === 'CNPJ' ? '99.999.999/9999-99' : '999.999.999-99'}
                  className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                    errors.document && 'outline-red-500'
                  }`}
                  placeholder={
                    documentType === 'CNPJ' ? 'xx.xxx.xxx/xxxx-xx' : 'xxx.xxx.xxx-xx'
                  }
                  readOnly={loading}
                  {...register('document', { required: true })}
                />
                {errors.document && (
                  <p className="text-[14px] text-red-500">
                    Você precisa inserir o documento.
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[14px] md:text-[15px] font-light">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                  errors.email && 'outline-red-500'
                }`}
                placeholder="Insira o seu e-mail"
                readOnly={loading}
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="text-[14px] text-red-500">Você precisa inserir o e-mail.</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[14px] md:text-[15px] font-light">
                Senha
              </label>
              <input
                id="password"
                type="password"
                className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                  errors.password && 'outline-red-500'
                }`}
                placeholder="Insira a sua senha"
                readOnly={loading}
                {...register('password', { required: false })}
              />
              {errors.password && (
                <p className="text-[14px] text-red-500">Você precisa inserir a senha.</p>
              )}
            </div>
            <button
              type="submit"
              className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label="Atualizar cliente"
              disabled={loading}
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
                </span>
              ) : (
                'Atualizar cliente'
              )}
            </button>
          </form>
        </Container>
      </div>
      <Services id={id} services={services} loading={loading} />
      <Invoices invoices={invoices} loading={loading} />
    </div>
  );
}
