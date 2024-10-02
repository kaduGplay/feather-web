'use client';

import { Container } from '@src/components';

import { useEffect, useState } from 'react';

import { Locations, Plan } from '.';

import { IService, IServiceLocation } from '@src/interfaces';

import { apiClient } from '@src/services';
import { RiLoader5Fill } from 'react-icons/ri';

export function Plans({ type }: { type: string }) {
  const [loading, setLoading] = useState(true);

  const [selectedLocation, setSelectedLocation] = useState<IServiceLocation | undefined>();

  const [service, setService] = useState<IService | undefined>();

  const [plans, setPlans] = useState<IService[]>([]);

  async function getPlansByLocation() {
    setLoading(true);

    await apiClient
      .get(`/services/location/${selectedLocation?.identifier}/${type}`)
      .then(response => {
        setPlans([]);
        setPlans(response.data);
        setLoading(false);
      })
      .catch(error => { });
  }

  useEffect(() => {
    if (selectedLocation) {
      getPlansByLocation();
    }
  }, [selectedLocation]);

  return (
    <Container>
      <div className="relative flex flex-col justify-center items-center bg-light-100 dark:bg-dark-100 rounded-md py-[100px] mt-[30px] gap-3">
        <div className="flex flex-col justify-center items-center text-center pb-[50px]">
          <h1 className="text-[26px] text-black dark:text-white font-semibold">
            Primeiro vamos escolher uma localização!
          </h1>
          <p className=" lg:w-[400px] text-[#5E5E5E]">
            A localização é importante para cuidar da rede de seu projeto.
          </p>
          <Locations
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
          <h1 className="text-[26px] text-black dark:text-white font-semibold mt-[100px]">
            Agora aquele plano TOP perfeito pra você!
          </h1>
          <p className=" lg:w-[400px] text-[#5E5E5E]">
            Escolha de acordo com suas necessidades e de seu projeto.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[50px]">
          {loading ? (
            // Skeleton Loader
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                role="status"
                className="animate-pulse p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out w-[340px] h-[400px] bg-gray-800 dark:bg-gray-200"
              >
              </div>
            ))
          ) : plans.length > 0 ? (
            plans.map((plan, index) => <Plan key={index} {...plan} />)
          ) : (
            <p className="flex mx-auto text-center lg:col-span-2 xl:col-span-3">
              Não há planos disponíveis no momento.
            </p>
          )}
        </div>

      </div>
    </Container>
  );
}
