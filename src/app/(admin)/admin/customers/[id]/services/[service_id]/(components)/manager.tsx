'use client';

import { apiClient } from '@src/services';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RiLoader5Fill } from 'react-icons/ri';

export function Manager({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function manager(type: 'suspend' | 'unsuspend' | 'finish' | 'recreate') {
    setLoading(true);

    await apiClient
      .get(`/manager/service/${type}/${id}`)
      .then(response => {
        toast.success(response.data.message);

        setLoading(false);
      })
      .catch(error => {
        console.log(error.response.data);

        toast.error(error.response.data.message);
        setLoading(false);
      });
  }

  return (
    <div>
      <h1 className="text-[22px] font-semibold my-8">Gerenciar serviço</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <button
          className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label="Suspender"
          onClick={() => manager('suspend')}
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
            </span>
          ) : (
            'Suspender'
          )}
        </button>
        <button
          className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label="Reativar"
          onClick={() => manager('unsuspend')}
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
            </span>
          ) : (
            'Reativar'
          )}
        </button>
        <button
          className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label="Recriar"
          onClick={() => manager('recreate')}
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
            </span>
          ) : (
            'Recriar'
          )}
        </button>
        <button
          className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label="Finalizar"
          onClick={() => manager('finish')}
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
            </span>
          ) : (
            'Finalizar'
          )}
        </button>
      </div>
    </div>
  );
}
