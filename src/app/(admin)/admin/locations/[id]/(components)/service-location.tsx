'use client';

import { useEffect, useState } from 'react';

import { Container } from '@src/components';

import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';
import toast from 'react-hot-toast';

interface IFormData {
  image: string;
  name: string;
  datacenter: string;
  identifier: string;
  is_active: boolean;
}

export function ServiceLocation({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  async function onSubmit({ name, image, datacenter, identifier, is_active }: IFormData) {
    setLoading(true);

    if (!name || !image || !datacenter || !identifier) {
      return setLoading(false);
    }

    await apiClient
      .put(`/locations/${id}`, {
        name,
        image,
        datacenter,
        identifier,
        is_active,
      })
      .then(response => {
        toast.success('A localização foi atualizada com sucesso!');

        setLoading(false);
      })
      .catch(error => {
        toast.error(error.response.data.message);

        setLoading(false);
      });
  }

  async function getService() {
    await apiClient
      .get(`/locations/${id}`)
      .then(response => {
        setValue('name', response.data.name);
        setValue('datacenter', response.data.datacenter);
        setValue('identifier', response.data.identifier);
        setValue('image', response.data.image);
        setValue('is_active', response.data.is_active);

        setLoading(false);
      })
      .catch(error => {});
  }

  useEffect(() => {
    getService();
  }, [id]);

  return (
    <div className="lg:w-[800px] mx-auto bg-gray-200 dark:bg-dark-100 p-2 rounded-md">
      <Container>
        <h1 className="text-[22px] font-semibold my-8">Atualizando localização</h1>
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
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="datacenter" className="text-[14px] md:text-[15px] font-light">
              Datacenter
            </label>
            <input
              id="datacenter"
              type="text"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.datacenter && 'outline-red-500'
              }`}
              placeholder="Insira o datacenter"
              readOnly={loading}
              {...register('datacenter', { required: true })}
            />
            {errors.datacenter && (
              <p className="text-[14px] text-red-500">
                Você precisa inserir o datacenter.
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="identifier" className="text-[14px] md:text-[15px] font-light">
              Identificação
            </label>
            <input
              id="identifier"
              type="text"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.identifier && 'outline-red-500'
              }`}
              placeholder="Insira a identificação"
              readOnly={loading}
              {...register('identifier', { required: true })}
            />
            {errors.identifier && (
              <p className="text-[14px] text-red-500">
                Você precisa inserir a identificação.
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="image" className="text-[14px] md:text-[15px] font-light">
              Imagem
            </label>
            <input
              id="image"
              type="text"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.image && 'outline-red-500'
              }`}
              placeholder="Insira a imagem"
              readOnly={loading}
              {...register('image', { required: true })}
            />
            {errors.image && (
              <p className="text-[14px] text-red-500">Você precisa inserir o imagem.</p>
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
            aria-label="Criar serviço"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
              </span>
            ) : (
              'Atualizar localização'
            )}
          </button>
        </form>
      </Container>
    </div>
  );
}
