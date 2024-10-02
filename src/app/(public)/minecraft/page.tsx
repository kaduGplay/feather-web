import { Navbar, Plans } from '@src/components';
import { Metadata } from 'next';
import Image from 'next/image';

import { BsChevronDoubleDown } from 'react-icons/bs';

export const metadata: Metadata = {
  title: 'Hospedagem Minecraft | FeatherHost',
  twitter: {
    title: 'Hospedagem Minecraft | FeatherHost',
  },
};

export default function Page() {
  return (
    <main>
      <Navbar/>
      <div className='w-full flex items-center justify-between px-24'>
        <div>
          <h1 style={{ textShadow: 'rgba(255, 255, 255, 0.59) 0px 0px 15px' }} className="text-stone-900 dark:text-slate-200 font-medium text-sm lg:mt-20 mt-36 w-full">HOSPEDE SEU SERVIDOR DE MINECRAFT CONOSCO!</h1>
          <h1 className="text-black dark:text-white font-bold lg:text-4xl text-xl w-full">Perfeito para qualquer <br />tipo de servidor de Minecraft!</h1>
          <p className="text-black dark:text-white/80 w-full">Desempenho excepcional, segurança robusta e suporte 24/7. Escolha a melhor hospedagem para seu servidor de Minecraft e leve seu jogo ao próximo nível!</p>
        </div>
        <div>
          <Image className={"goUpDownReverse"} src={"https://chunky-dev.github.io/docs/assets/hero.webp"} alt={"Image Error"} width={650} height={500} />
        </div>
      </div>
      <Plans type="MINECRAFT" />
    </main>
  );
}
