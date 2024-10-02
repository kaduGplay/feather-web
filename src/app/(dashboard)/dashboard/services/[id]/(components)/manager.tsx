'use client';

import { apiClient } from '@src/services';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RiLoader5Fill } from 'react-icons/ri';

export function Manager({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function manager(type: 'start' | 'restart' | 'stop') {
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
    <div className="mt-8">
      <h1 className="text-[22px] font-semibold mb-8">Gerenciamento do serviço</h1>
      <div className="bg-white dark:bg-black p-8 rounded-md flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <button
            className={`w-full text-[14px] lg:text-[16px] bg-green-400 hover:bg-green-500 dark:bg-green-300 dark:hover:bg-green-400 text-white dark:text-black py-[15px] px-[25px] rounded-[15px] transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Iniciar"
            onClick={() => manager('start')}
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
              </span>
            ) : (
              'Iniciar'
            )}
          </button>
          <button
            className={`w-full text-[14px] lg:text-[16px] bg-blue-400 hover:bg-blue-500 dark:bg-blue-300 dark:hover:bg-blue-400 text-white dark:text-black py-[15px] px-[25px] rounded-[15px] transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Reiniciar"
            onClick={() => manager('restart')}
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
              </span>
            ) : (
              'Reiniciar'
            )}
          </button>
          <button
            className={`w-full text-[14px] lg:text-[16px] bg-red-400 hover:bg-red-500 dark:bg-red-300 dark:hover:bg-red-400 text-white dark:text-black py-[15px] px-[25px] rounded-[15px] transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Parar"
            onClick={() => manager('stop')}
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
              </span>
            ) : (
              'Parar'
            )}
          </button>
        </div>
        <p className="text-[14px] text-gray-500 text-center">
          <b>OBS:</b> Para um gerenciamento mais complexo será necessário entrar no painel
          de controle.
        </p>
      </div>
    </div>
  );
}
