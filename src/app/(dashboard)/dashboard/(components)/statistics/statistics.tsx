'use client';

import { Container } from '@src/components';

import { Statistic } from '.';

import { PiFileMinusBold, PiHardDrivesBold, PiHeadsetBold } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { apiClient } from '@src/services';

export function Statistics() {
  const [statistic, setStatistic] = useState<{
    services: number;
    invoices: number;
    tickets: number;
  } | null>(null);

  const statistics = [
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

  async function getStatistics() {
    await apiClient
      .get('/customers/statistics')
      .then(response => {
        setStatistic(response.data);
      })
      .catch(error => {});
  }

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <Container>
      <h1 className="text-[22px] font-semibold mb-8">Visão geral</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
        {statistics.map((statistic, index) => (
          <Statistic key={index} {...statistic} />
        ))}
      </div>
    </Container>
  );
}
