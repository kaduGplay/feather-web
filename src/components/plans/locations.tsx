'use client';

import Image from 'next/image';

import { IServiceLocation } from '@src/interfaces';
import { useEffect, useState } from 'react';
import { apiClient } from '@src/services';
import toast from 'react-hot-toast';

export function Locations({
  selectedLocation,
  setSelectedLocation,
}: {
  selectedLocation: IServiceLocation | undefined;
  setSelectedLocation(location: IServiceLocation): void;
}) {
  const [loading, setLoading] = useState(true);

  const [locations, setLocations] = useState<IServiceLocation[]>([]);

  async function getLocations() {
    setLoading(true);

    await apiClient
      .get('/locations')
      .then(response => {
        setSelectedLocation(response.data[0]);

        setLocations(response.data);

        setLoading(false);
      })
      .catch(error => { });
  }

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div className="flex items-center gap-2 mt-8">
      {/* <Image src="/flags/brazil.svg" width={32} height={32} quality={100} alt="Brasil" />
      <div className="cursor-pointer">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={event => {
              setActive(event.target.checked);

              toast.success('Você alterou a localização.');
            }}
          />
          <div className="w-11 h-6 bg-[#E9E9E9] rounded-full peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-1.5 mt-1 after:left-[2px] after:bg-white dark:after:bg-black dark:peer-checked:after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
        </label>
      </div>
      <Image
        src="/flags/argentina.svg"
        width={28}
        height={28}
        quality={100}
        alt="Brasil"
          />*/}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {loading ? (
          <div role="status" className="flex items-center animate-pulse">
            <div className="flex items-center justify-center py-1 px-3 border-none m-2 rounded-tr-lg rounded-bl-lg rounded-tl-[1px] rounded-br-[1px] transition duration-200 ease-in-out w-[290px] h-16 bg-gray-800 rounded-md dark:bg-gray-200"></div>
            <div className="flex items-center justify-center py-1 px-3 border-none m-2 rounded-tr-lg rounded-bl-lg rounded-tl-[1px] rounded-br-[1px] transition duration-200 ease-in-out w-[290px] h-16 bg-gray-800 rounded-md dark:bg-gray-200"></div>
          </div>
        ) : locations.length > 0 ? (
          locations.map((location, index) => (
            <div
              key={index}
              className={`w-[290px] h-16 flex items-center justify-center py-1 px-3 border-none bg-white dark:bg-[#080a0a] m-2 rounded-tr-lg rounded-bl-lg rounded-tl-[1px] rounded-br-[1px] transition duration-200 ease-in-out ${selectedLocation?.identifier === location.identifier
                ? 'selectedLocation cursor-not-allowed'
                : 'text-green-100'
                } cursor-pointer`}
              onClick={() => {
                setSelectedLocation(location);
                toast.success('A localização ' + location.name + ' foi selecionada.');
              }}
            >
              <div className='flex items-center'>
                <Image className={"rounded-md"} quality={100} src={location.image} width={50} height={40} alt={location.name} />
                <div className='ml-2 text-black dark:text-white font-light text-start'>
                  <h2 className='font-bold text-xl'>{location.name}</h2>
                  <p className='text-xs opacity-50'>Conexão Excelente</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-600">Nenhuma localização foi encontrada.</p>
        )}
      </div>
    </div>
  );
}
