import { Container } from '@src/components';

import { Benefit } from '.';

import {
  PiCellSignalFull,
  PiFloppyDisk,
  PiHardDrives,
  PiHeadset,
  PiShieldCheck,
  PiWifiHigh,
} from 'react-icons/pi';

export function Benefits() {
  const benefits = [
    {
      icon: <PiHardDrives className="text-white dark:text-black" size={40} />,
      name: 'Datacenters Tier III',
      children:
        'Estamos localizados em data centers com certificações, aonde possuem toda segurança necessária, como sistemas contra incêndios, seguro de nossos equipamentos e acesso restrito.',
    },
    {
      icon: <PiShieldCheck className="text-white dark:text-black" size={40} />,
      name: 'Infraestrutura própria',
      children:
        'Nossa empresa utiliza hardware próprio para todos os servidores dedicados, garantindo total controle e desempenho otimizado. Com essa abordagem, oferecemos soluções personalizadas e de alta confiabilidade para nossos clientes.',
    },
    {
      icon: <PiHeadset className="text-white dark:text-black" size={40} />,
      name: 'Suporte',
      children:
        'Suporte para solução de problemas com hospedagem VPS, servidores dedicados e hospedagem de minecraft.',
    },
    {
      icon: <PiCellSignalFull className="text-white dark:text-black" size={40} />,
      name: 'Uptime de 99%',
      children:
        'Uptime garantido de 99% para hospedagem VPS, servidores dedicados e hospedagem de minecraft.',
    },
    {
      icon: <PiWifiHigh className="text-white dark:text-black" size={40} />,
      name: 'Conexão dedicada',
      children:
        'Nós oferecemos a você o melhor ping do Brasil para seu servidor, garantindo velocidade e estabilidade em suas conexões.',
    },
    {
      icon: <PiFloppyDisk className="text-white dark:text-black" size={40} />,
      name: 'Discos SSD NVME',
      children:
        'Nossa tecnologia avançada garante leituras extremamente rápidas e poderosas, proporcionando a você uma experiência sem lags e interrupções.',
    },
  ];

  return (
    <div className="relative text-black dark:text-white bg-light-100 dark:bg-[#070808] py-10">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-[36px] text-black dark:text-white font-semibold">
          Recursos
        </h1>
        <p className="lg:w-[600px] lg:text-[18px] font-light">
          Tenha noção e não sinta vontade de nossos sistemas.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-7 mt-10">
        {benefits.map((benefit, index) => (
          <Benefit key={index} {...benefit} />
        ))}
      </div>
    </div>
  );
}
