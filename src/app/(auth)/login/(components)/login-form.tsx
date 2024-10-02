'use client';

import { useCustomer } from '@src/contexts';
import Link from 'next/link';

import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { RiLoader5Fill } from 'react-icons/ri';

interface IFormData {
  email: string;
  password: string;
  remember_me: boolean;
}

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const { signIn } = useCustomer();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  async function onSubmit({ email, password, remember_me }: IFormData) {
    setLoading(true);

    if (!email || !password) {
      return setLoading(false);
    }

    await signIn({ email, password, remember_me, setLoading });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 accent-primary"
            disabled={loading}
            {...register('remember_me')}
          />
          <label className="text-sm md:text-md" htmlFor="remember">
            Lembrar de mim
          </label>
        </div>
        <Link
          className="text-sm md:text-md text-primary hover:text-secondary"
          href="/forgot"
        >
          Esqueceu sua senha?
        </Link>
      </div>
      <button
        type="submit"
        className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Login"
        disabled={loading}
      >
        {loading ? (
          <span className="flex justify-center items-center gap-2">
            <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
          </span>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
}
