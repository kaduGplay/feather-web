'use client';

import { Container } from '@src/components';

import { Statistic } from '.';

import {
  PiCurrencyDollarBold,
  PiFileMinusBold,
  PiHardDrivesBold,
  PiHeadsetBold,
  PiUsersBold,
} from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { apiClient } from '@src/services';

export function Statistics() {
  const [statistic, setStatistic] = useState<{
    customers: number;
    services: number;
    invoices: number;
    tickets: number;
    day: number;
    month: number;
    year: number;
    all: number;
  } | null>(null);

  const statistics = [
    {
      icon: <PiUsersBold className="text-white dark:text-black" size={28} />,
      name: 'Clientes ativos',
      value: statistic?.customers || 0,
    },
    {
      icon: <PiHardDrivesBold className="text-white dark:text-black" size={28} />,
      name: 'Serviços ativos',
      value: statistic?.services || 0,
    },
    {
      icon: <PiFileMinusBold className="text-white dark:text-black" size={28} />,
      name: 'Faturas pendentes',
      value: statistic?.invoices || 0,
    },
    {
      icon: <PiHeadsetBold className="text-white dark:text-black" size={28} />,
      name: 'Tickets abertos',
      value: statistic?.tickets || 0,
    },
  ];

  const statisticsGains = [
    {
      icon: <PiCurrencyDollarBold className="text-white dark:text-black" size={28} />,
      name: 'Lucro do dia',
      value: statistic?.day || 0,
    },
    {
      icon: <PiCurrencyDollarBold className="text-white dark:text-black" size={28} />,
      name: 'Lucro do mês',
      value: statistic?.month || 0,
    },
    {
      icon: <PiCurrencyDollarBold className="text-white dark:text-black" size={28} />,
      name: 'Lucro do ano',
      value: statistic?.year || 0,
    },
    {
      icon: <PiCurrencyDollarBold className="text-white dark:text-black" size={28} />,
      name: 'Lucro total',
      value: statistic?.all || 0,
    },
  ];

  async function getStatistics() {
    await apiClient
      .get('/statistics')
      .then(response => {
        setStatistic(response.data);
      })
      .catch(error => {});
  }

  console.log(statistic);

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <Container>
      <h1 className="text-[22px] font-semibold">Visão geral</h1>
      <p className='text-sm font-light opacity-70 mb-8'>Tenha a visão total das estatísticas da plataforma.</p>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[20px]">
        {statistics.map((statistic, index) => (
          <Statistic key={index} {...statistic} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[20px] mt-[20px]">
        {statisticsGains.map((statistic, index) => (
          <Statistic key={index} {...statistic} gain={true} />
        ))}
      </div>
    </Container>
  );
}
