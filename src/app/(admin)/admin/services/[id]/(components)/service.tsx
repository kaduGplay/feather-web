'use client';

import { useEffect, useState } from 'react';

import { Container } from '@src/components';

import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';
import toast from 'react-hot-toast';
import { IServiceLocation } from '@src/interfaces';

interface IFormData {
  name: string;
  price: number;
  type: string;
  service_location_id: string;
  features: JSON;
  cpu?: number;
  ram?: number;
  disk?: number;
  slots?: number;
  ips?: number;
  uplink?: string;
  external_cloud_id?: string;
  external_cloud_space_uuid?: string;
  installation_fee?: number;
  is_active: boolean;
}

export function Service({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const [features, setFeatures] = useState(''.split(','));
  const [locations, setLocations] = useState<IServiceLocation[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  const type = watch('type');

  async function onSubmit({
    name,
    price,
    type,
    service_location_id,
    cpu,
    ram,
    disk,
    slots,
    ips,
    uplink,
    external_cloud_id,
    external_cloud_space_uuid,
    installation_fee,
    is_active,
  }: IFormData) {
    setLoading(true);

    if (!name || !price || !type || !service_location_id || !features) {
      return setLoading(false);
    }

    await apiClient
      .put(`/services/${id}`, {
        name,
        price,
        type,
        service_location_id,
        features: JSON.stringify(features),
        cpu,
        ram,
        disk,
        slots,
        ips,
        uplink,
        external_cloud_id,
        external_cloud_space_uuid,
        installation_fee,
        is_active,
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

  // start features

  const addInputFeature = () => {
    setFeatures([...features, '']);
  };

  const handleChangeFeature = (event: any, index: number) => {
    features[index] = event.target.value;
    setFeatures([...features]);
  };

  const handleRemoveFeature = (position: number) => {
    setFeatures([...features.filter((_: string, index: number) => index != position)]);
  };

  // end features

  async function getLocations() {
    await apiClient
      .get('/locations')
      .then(response => setLocations(response.data))
      .catch(error => {});
  }

  useEffect(() => {
    getLocations();
  }, []);

  async function getService() {
    await apiClient
      .get(`/services/${id}`)
      .then(response => {
        setValue('name', response.data.name);
        setValue('price', response.data.price);
        setValue('type', response.data.type);
        setValue('service_location_id', response.data.service_location_id);
        setValue('features', response.data.features);
        setFeatures(JSON.parse(response.data.features));
        setValue('cpu', response.data.cpu);
        setValue('ram', response.data.ram);
        setValue('disk', response.data.disk);
        setValue('slots', response.data.slots);
        setValue('ips', response.data.ips);
        setValue('uplink', response.data.uplink);
        setValue('external_cloud_id', response.data.external_cloud_id);
        setValue('external_cloud_space_uuid', response.data.external_cloud_space_uuid);
        setValue('installation_fee', response.data.installation_fee);
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
        <h1 className="text-[22px] font-semibold my-8">Atualizando serviço</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="name" className="text-[14px] md:text-[15px] font-light">
                Nome
              </label>
              <input
                id="name"
                type="name"
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
              <label
                htmlFor="service_location_id"
                className="text-[14px] md:text-[15px] font-light"
              >
                Localização
              </label>
              <select
                id="service_location_id"
                className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                  errors.service_location_id && 'outline-red-500'
                }`}
                disabled={loading}
                {...register('service_location_id', { required: true })}
              >
                <option value="" selected>
                  Selecione
                </option>
                {locations.map((location, index) => (
                  <option key={index} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              {errors.service_location_id && (
                <p className="text-[14px] text-red-500">
                  Você precisa selecionar a localização.
                </p>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="price" className="text-[14px] md:text-[15px] font-light">
              Preço
            </label>
            <input
              id="price"
              type="number"
              min={1}
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.price && 'outline-red-500'
              }`}
              placeholder="Insira o preço"
              readOnly={loading}
              {...register('price', { required: true })}
            />
            {errors.price && (
              <p className="text-[14px] text-red-500">Você precisa inserir o preço.</p>
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
              <option value="VPS">Servidor VPS</option>
              <option value="DEDICATED_SERVER">Servidor Dedicado</option>
              <option value="MINECRAFT">Hospedagem de Minecraft</option>
            </select>
            {errors.type && (
              <p className="text-[14px] text-red-500">Você precisa selecionar o tipo.</p>
            )}
          </div>
          {type === 'VPS' || type === 'DEDICATED_SERVER' || type === 'MINECRAFT' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="cpu" className="text-[14px] md:text-[15px] font-light">
                  vCPU
                </label>
                <input
                  id="cpu"
                  type="number"
                  min={1}
                  className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                    errors.cpu && 'outline-red-500'
                  }`}
                  placeholder="Insira a cpu"
                  readOnly={loading}
                  {...register('cpu', { required: true })}
                />
                {errors.cpu && (
                  <p className="text-[14px] text-red-500">Você precisa inserir a cpu.</p>
                )}
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="ram" className="text-[14px] md:text-[15px] font-light">
                  Memória RAM
                </label>
                <input
                  id="ram"
                  type="number"
                  min={1}
                  className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                    errors.ram && 'outline-red-500'
                  }`}
                  placeholder="Insira a ram"
                  readOnly={loading}
                  {...register('ram', { required: true })}
                />
                {errors.ram && (
                  <p className="text-[14px] text-red-500">Você precisa inserir a ram.</p>
                )}
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="disk" className="text-[14px] md:text-[15px] font-light">
                  Disco
                </label>
                <input
                  id="disk"
                  type="number"
                  min={1}
                  className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                    errors.disk && 'outline-red-500'
                  }`}
                  placeholder="Insira o disco"
                  readOnly={loading}
                  {...register('disk', { required: true })}
                />
                {errors.disk && (
                  <p className="text-[14px] text-red-500">
                    Você precisa inserir o disco.
                  </p>
                )}
              </div>
            </div>
          ) : null}
          {type === 'VPS' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex w-full flex-col gap-2">
                <label
                  htmlFor="external_cloud_id"
                  className="text-[14px] md:text-[15px] font-light"
                >
                  External node ID
                </label>
                <input
                  id="external_cloud_id"
                  type="text"
                  className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                    errors.external_cloud_id && 'outline-red-500'
                  }`}
                  placeholder="Insira o id externo"
                  readOnly={loading}
                  {...register('external_cloud_id', { required: true })}
                />
                {errors.external_cloud_id && (
                  <p className="text-[14px] text-red-500">
                    Você precisa inserir o id externo do node.
                  </p>
                )}
              </div>
              <div className="flex w-full flex-col gap-2">
                <label
                  htmlFor="external_cloud_space_uuid"
                  className="text-[14px] md:text-[15px] font-light"
                >
                  Cloud Space UUID
                </label>
                <input
                  id="external_cloud_space_uuid"
                  type="text"
                  className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                    errors.external_cloud_space_uuid && 'outline-red-500'
                  }`}
                  placeholder="Insira o id do disco"
                  readOnly={loading}
                  {...register('external_cloud_space_uuid', { required: true })}
                />
                {errors.external_cloud_space_uuid && (
                  <p className="text-[14px] text-red-500">
                    Você precisa inserir o id do disco.
                  </p>
                )}
              </div>
            </div>
          )}
          {type === 'VPS' || type === 'DEDICATED_SERVER' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex w-full flex-col gap-2">
                <label
                  htmlFor="installation_fee"
                  className="text-[14px] md:text-[15px] font-light"
                >
                  Taxa (Opcional)
                </label>
                <input
                  id="installation_fee"
                  type="number"
                  min={0}
                  defaultValue={0}
                  className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                    errors.installation_fee && 'outline-red-500'
                  }`}
                  placeholder="Insira a taxa"
                  readOnly={loading}
                  {...register('installation_fee', { required: false })}
                />
                {errors.installation_fee && (
                  <p className="text-[14px] text-red-500">Você precisa inserir a taxa.</p>
                )}
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="ips" className="text-[14px] md:text-[15px] font-light">
                  IPs
                </label>
                <input
                  id="ips"
                  type="number"
                  min={1}
                  defaultValue={1}
                  className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                    errors.ips && 'outline-red-500'
                  }`}
                  placeholder="Insira o número de ips"
                  readOnly={loading}
                  {...register('ips', { required: true })}
                />
                {errors.ips && (
                  <p className="text-[14px] text-red-500">Você precisa inserir os ips.</p>
                )}
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="uplink" className="text-[14px] md:text-[15px] font-light">
                  Uplink
                </label>
                <input
                  id="uplink"
                  type="text"
                  className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                    errors.uplink && 'outline-red-500'
                  }`}
                  placeholder="Insira o uplink"
                  readOnly={loading}
                  {...register('uplink', { required: true })}
                />
                {errors.uplink && (
                  <p className="text-[14px] text-red-500">
                    Você precisa inserir o uplink.
                  </p>
                )}
              </div>
            </div>
          ) : null}
          <div className="flex justify-between items-center">
            <h1>Vantagens</h1>
            <button
              className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-[15px] transition-all ease-in-out duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={loading}
              type="button"
              onClick={() => addInputFeature()}
            >
              Adicionar vantagem
            </button>
          </div>
          {features.map((feature: string, index: number) => (
            <div className="flex flex-col gap-2" key={index} id={`feature-${index + 1}`}>
              <div className="flex flex-col gap-2">
                <h3 className="text-[14px] md:text-[15px] font-light">
                  Vantagem #{index + 1}
                </h3>
              </div>
              <div className="flex">
                <input
                  type="text"
                  id={`feature-${index + 1}`}
                  className={`bg-white dark:bg-black p-3 rounded-l-lg text-[14px] md:text-[15px] font-light w-full`}
                  placeholder={'Insira a vantagem'}
                  value={feature}
                  onChange={event => handleChangeFeature(event, index)}
                  required
                />
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-slate-50 border border-l-0 border-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white rounded-r-lg">
                  <button onClick={() => handleRemoveFeature(index)}>X</button>
                </span>
              </div>
            </div>
          ))}
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
              'Atualizar serviço'
            )}
          </button>
        </form>
      </Container>
    </div>
  );
}
