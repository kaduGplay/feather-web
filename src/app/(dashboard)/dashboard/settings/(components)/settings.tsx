'use client';

import { Container } from '@src/components';
import { useCustomer } from '@src/contexts';
import { apiClient } from '@src/services';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RiLoader5Fill } from 'react-icons/ri';
import ReactInputMask from 'react-input-mask';

interface IFormData {
  name: string;
  document_type: 'CPF' | 'CNPJ';
  document: string;
  email: string;
  password: string;
  newPassword: string;
}

export function Settings() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormData>();

  const documentType = watch('document_type');

  const { customer } = useCustomer();

  async function onSubmit({ email, password, newPassword }: IFormData) {
    setLoading(true);

    if (!email || !password) {
      toast.error('Você precisa preencher os campos.');

      return setLoading(false);
    }

    await apiClient
      .put('/customer', {
        email,
        password,
        newPassword,
      })
      .then(response => {
        toast.success('Os dados foram atualizados com sucesso.');

        setValue('password', '');
        setValue('newPassword', '');

        return setLoading(false);
      })
      .catch(error => {
        toast.error(error.response.data.error);

        return setLoading(false);
      });
  }

  useEffect(() => {
    if (customer) {
      setValue('name', customer.name);
      setValue('document_type', customer.customerDocument.document_type);
      setValue('document', customer.customerDocument.document);
      setValue('email', customer.email);
    }
  }, [customer]);

  return (
    <div className="mx-auto">
      <Container>
        <h1 className="text-[22px] font-semibold my-8">Configurações</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[14px] md:text-[15px] font-light">
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.name && 'outline-red-500'
              }`}
              placeholder="Insira o assunto"
              readOnly={loading}
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className="text-[14px] text-red-500">Você precisa inserir o nome.</p>
            )}
          </div>
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
            <label htmlFor="document" className="text-[14px] md:text-[15px] font-light">
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
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="text-[14px] text-red-500">Você precisa inserir a senha.</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="newPassword"
              className="text-[14px] md:text-[15px] font-light"
            >
              Nova Senha
            </label>
            <input
              id="newPassword"
              type="password"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.newPassword && 'outline-red-500'
              }`}
              placeholder="Nova senha"
              readOnly={loading}
              {...register('newPassword', { required: false })}
            />
            {errors.newPassword && (
              <p className="text-[14px] text-red-500">
                Você precisa inserir a nova senha.
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Atualizar configurações"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
              </span>
            ) : (
              'Atualizar configurações'
            )}
          </button>
        </form>
      </Container>
    </div>
  );
}
