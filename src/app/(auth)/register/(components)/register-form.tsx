'use client';

import { apiClient } from '@src/services';
import Link from 'next/link';
import { useState } from 'react';

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
  confirmPassword: string;
  terms: boolean;
}

export function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      document_type: 'CPF',
    },
  });

  const documentType = watch('document_type');

  async function onSubmit({
    name,
    document_type,
    document,
    email,
    password,
    confirmPassword,
    terms,
  }: IFormData) {
    setLoading(true);

    if (!name || !document_type || !document || !email || !password || !confirmPassword) {
      return setLoading(false);
    }

    if (!terms) {
      toast.error('Você precisa aceitar os termos de serviço.');

      return setLoading(false);
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não são iguais.');

      return setLoading(false);
    }

    await apiClient
      .post('/customers', {
        name,
        email,
        password,
        document,
      })
      .then(response => {
        toast.success(response.data.message);

        window.location.href = '/login';
      })
      .catch(error => {
        toast.error(error.response.data.message);

        return setLoading(false);
      });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[14px] md:text-[15px] font-light">
          Nome completo
        </label>
        <input
          id="name"
          type="text"
          className={`bg-light-100 dark:bg-dark-100 p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
            errors.name && 'outline-red-500'
          }`}
          placeholder="Insira o seu nome"
          readOnly={loading}
          {...register('name', { required: true })}
        />
        {errors.name && (
          <p className="text-[14px] text-red-500">
            Você precisa inserir o nome completo.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="document_type" className="text-[14px] md:text-[15px] font-light">
          Tipo do documento
        </label>
        <select
          id="document_type"
          className={`bg-light-100 dark:bg-dark-100 p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
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
          className={`bg-light-100 dark:bg-dark-100 p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
            errors.document && 'outline-red-500'
          }`}
          placeholder={documentType === 'CNPJ' ? 'xx.xxx.xxx/xxxx-xx' : 'xxx.xxx.xxx-xx'}
          readOnly={loading}
          {...register('document', { required: true })}
        />
        {errors.document && (
          <p className="text-[14px] text-red-500">Você precisa inserir o documento.</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[14px] md:text-[15px] font-light">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          className={`bg-light-100 dark:bg-dark-100 p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
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
          className={`bg-light-100 dark:bg-dark-100 p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
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
          htmlFor="confirmPassword"
          className="text-[14px] md:text-[15px] font-light"
        >
          Confirmar Senha
        </label>
        <input
          id="confirmPassword"
          type="password"
          className={`bg-light-100 dark:bg-dark-100 p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
            errors.confirmPassword && 'outline-red-500'
          }`}
          placeholder="Repita a sua senha"
          readOnly={loading}
          {...register('confirmPassword', { required: true })}
        />
        {errors.confirmPassword && (
          <p className="text-[14px] text-red-500">Você precisa repetir a senha.</p>
        )}
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 accent-primary"
            disabled={loading}
            {...register('terms')}
          />
          <label className="text-sm md:text-md" htmlFor="remember">
            <Link href={"/termos"} className='text-sky-500'>Eu aceito os termos de serviço.</Link>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Cadastrar"
        disabled={loading}
      >
        {loading ? (
          <span className="flex justify-center items-center gap-2">
            <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
          </span>
        ) : (
          'Cadastrar'
        )}
      </button>
    </form>
  );
}
