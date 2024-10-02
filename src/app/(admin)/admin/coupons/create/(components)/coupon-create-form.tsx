'use client';

import { useState } from 'react';

import { Container } from '@src/components';

import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';
import toast from 'react-hot-toast';

interface IFormData {
  code: string;
  type: 'PERCENT' | 'FIXED';
  value: number;
  is_recurrent: boolean;
  expires_at?: Date;
  is_active: boolean;
}

export function CouponCreateForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  async function onSubmit({
    code,
    type,
    value,
    is_recurrent,
    expires_at,
    is_active,
  }: IFormData) {
    setLoading(true);

    if (!code || !type || !value) {
      return setLoading(false);
    }

    await apiClient
      .post('/coupons', {
        code,
        type,
        value,
        is_recurrent,
        expires_at,
        is_active,
      })
      .then(response => {
        toast.success('O cupom foi criado com sucesso!');

        window.location.href = `/admin/coupons/${response.data.id}`;
      })
      .catch(error => {
        toast.error(error.response.data.message);

        setLoading(false);
      });
  }

  return (
    <div className="lg:w-[800px] mx-auto bg-gray-200 dark:bg-dark-100 p-2 rounded-md">
      <Container>
        <h1 className="text-[22px] font-semibold my-8">Criando cupom</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="code" className="text-[14px] md:text-[15px] font-light">
              Código
            </label>
            <input
              id="code"
              type="text"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.code && 'outline-red-500'
              }`}
              placeholder="Insira o código"
              readOnly={loading}
              {...register('code', { required: true })}
            />
            {errors.code && (
              <p className="text-[14px] text-red-500">Você precisa inserir o código.</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="text-[14px] md:text-[15px] font-light">
              Tipo
            </label>
            <select
              id="type"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.type && 'outline-red-500'
              }`}
              disabled={loading}
              {...register('type', { required: true })}
            >
              <option value="" selected>
                Selecione
              </option>
              <option value="PERCENT">Porcentagem</option>
              <option value="FIXED">Valor fixo</option>
            </select>
            {errors.type && (
              <p className="text-[14px] text-red-500">Você precisa selecionar o tipo.</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="value" className="text-[14px] md:text-[15px] font-light">
              Desconto
            </label>
            <input
              id="value"
              type="number"
              min={1}
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.value && 'outline-red-500'
              }`}
              placeholder="Insira o desconto"
              readOnly={loading}
              {...register('value', { required: true })}
            />
            {errors.value && (
              <p className="text-[14px] text-red-500">Você precisa inserir o desconto.</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="expires_at" className="text-[14px] md:text-[15px] font-light">
              Expiração
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
          <div className="flex flex-row gap-2 items-center">
            <div className="cursor-pointer">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  disabled={loading}
                  {...register('is_recurrent')}
                />
                <div className="w-11 h-6 bg-[#E9E9E9] rounded-full peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-1.5 mt-1 after:left-[2px] after:bg-white dark:after:bg-black dark:peer-checked:after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
            <span className="-mt-1.5">E recorrente?</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="cursor-pointer">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  disabled={loading}
                  {...register('is_active')}
                />
                <div className="w-11 h-6 bg-[#E9E9E9] rounded-full peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-1.5 mt-1 after:left-[2px] after:bg-white dark:after:bg-black dark:peer-checked:after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
            <span className="-mt-1.5">Esta ativo?</span>
          </div>
          <button
            type="submit"
            className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Criar cupom"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
              </span>
            ) : (
              'Criar cupom'
            )}
          </button>
        </form>
      </Container>
    </div>
  );
}
