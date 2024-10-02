'use client';

import Link from 'next/link';
import { Bubbles, Container, Navbar } from '@src/components';
import { PiPlayBold } from 'react-icons/pi';
import ServerAnimation from './server-animation';

export function Header() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="lines w-screen h-full m-auto relative">
          <div className="line w-[1px] h-full bg-black/10 dark:bg-white/10 absolute left-[20%]"></div>
          <div className="line w-[1px] h-full bg-black/10 dark:bg-white/10 absolute left-[37.5%]"></div>
          <div className="line w-[1px] h-full bg-black/10 dark:bg-white/10 absolute left-[50%]"></div>
          <div className="line w-[1px] h-full bg-black/10 dark:bg-white/10 absolute left-[62.5%]"></div>
          <div className="line w-[1px] h-full bg-black/10 dark:bg-white/10 absolute left-[80%]"></div>
        </div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <Container>
        <div className="h-screen relative flex flex-col lg:flex-row justify-around items-center text-left px-[10px] z-20 -mt-[5.5rem]">
          <div className="h-full flex flex-col justify-center items-start gap-[20px] text-left lg:w-1/2 lg:pr-[20px] animate__animated animate__backInLeft">
            <h2 className="text-[14px] lg:text-[16px] font-semibold uppercase">
              🔥 Melhores servidores do mercado
            </h2>
            <h1 className="lg:w-[600px] text-[35px] lg:text-[46px] text-transparent bg-clip-text bg-gradient-to-b from-[#000] to-[#414141] dark:from-[#fff] dark:to-[#E8E8E8] to-50% font-bold leading-[101.4%]">
              Pensando em aprimorar o seu servidor?
            </h1>
            <p className="lg:w-[530px] text-[14px] lg:text-[16px] dark:text-white/70 text-black/70">
              Os melhores planos de hospedagem para jogos, aplicações e diversos outros
              serviços. Com performance excepcional, suporte técnico dedicado e uma
              variedade de recursos avançados. Escolha ideal para garantir estabilidade e
              eficiência do seu ambiente.
            </p>
            <div className="flex items-center gap-[30px] mt-[20px]">
              <Link
                href="/"
                className="bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black text-[14px] lg:text-[16px] py-[10px] px-[50px] rounded-[12px] transition-all ease-in-out duration-300 hover:-translate-y-1"
                aria-label="Explorar"
              >
                Explorar
              </Link>
              <Link
                href="/"
                className="flex items-center gap-[15px] text-black dark:text-[#CACACA] text-[14px] lg:text-[16px] rounded-[12px]"
                aria-label="Como funcionamos"
              >
                <div className="bg-gray-200 dark:bg-white/30 rounded-full py-[12px] lg:py-[15px] px-[12px] lg:px-[15px] transition-all ease-in-out duration-300 hover:rotate-[20deg] hover:scale-110">
                  <PiPlayBold className="text-black dark:text-white" size={20} />
                </div>
                Como funcionamos
              </Link>
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/2 lg:pl-[20px]">
            <ServerAnimation />
          </div>
        </div>
      </Container>
    </div>
  );
}
