import { Metadata } from 'next';

import { Navbar, Plans } from '@src/components';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Hospedagem JS | FeatherHost',
  twitter: {
    title: 'Hospedagem JS | FeatherHost',
  },
};

export default function Page() {
  return (
    <main>
      <Navbar/>
      <div className='w-full flex items-center justify-between px-24'>
        <div>
          <h1 style={{ textShadow: 'rgba(255, 255, 255, 0.59) 0px 0px 15px' }} className="text-stone-900 dark:text-slate-200 font-medium text-sm lg:mt-20 mt-36 w-full">HOSPEDE SUA APLICAÇÃO JS CONOSCO!</h1>
          <h1 className="text-black dark:text-white font-bold lg:text-4xl text-xl w-full">Perfeito para qualquer <br />tipo de projeto!</h1>
          <p className="text-black dark:text-white/80 w-full">Desempenho excepcional, segurança robusta e suporte 24/7. Escolha a melhor hospedagem para sua aplicação eleve seu projeto ao próximo nível!</p>
        </div>
        <div>
          <Image className={"goUpDownReverse"} src={"https://static.vecteezy.com/system/resources/previews/027/127/463/original/javascript-logo-javascript-icon-transparent-free-png.png"} alt={"Image Error"} width={650} height={500} />
        </div>
      </div>
      <Plans type="BOTJS" />
    </main>
  );
}