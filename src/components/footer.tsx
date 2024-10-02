'use client';

import Link from 'next/link';

import { Container, Logotipo } from '.';

import {
  PiInstagramLogoFill,
} from 'react-icons/pi';
import {
  SiPterodactyl
} from 'react-icons/si';

export function Footer() {
  return (
    <footer className="pt-[100px] pb-[25px]">
      <Container>
        <div className="flex flex-col gap-[50px]">
          <div className="flex flex-col items-center gap-2">
            <Link href="/" aria-label="FeatherHost">
              <div className="flex items-center gap-1">
                <Logotipo width={80} height={80} />
              </div>
            </Link>
            <p className="text-[14px] lg:text-[16px] text-[#5E5E5E] max-w-6xl text-center">
              A FeatherHost destaca-se como uma das principais opções de hospedagem para
              Minecraft, jogos e aplicações. Com sua infraestrutura robusta e confiável,
              oferece desempenho excepcional, garantindo uma experiência de jogo suave e
              estável. Além disso, seu suporte técnico dedicado e recursos avançados
              tornam-na uma escolha preferencial para aqueles que buscam qualidade e
              eficiência em serviços de hospedagem.
            </p>
          </div>
          <div className="flex mx-auto lg:mx-0 flex-col gap-[30px] lg:gap-0 lg:flex-row lg:justify-around lg:items-center lg:px-[80px]">
            <ul>
              <li className="text-[16px] lg:text-[18px] font-semibold">Serviços</li>
              <li>
                <Link
                  href="/"
                  className="text-[#565656] text-[14px] lg:text-[16px] hover:underline"
                  aria-label="Hospedagem de Minecraft"
                >
                  Hospedagem de Minecraft
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#565656] text-[14px] lg:text-[16px] hover:underline"
                  aria-label="Hospedagem VPS"
                >
                  Hospedagem VPS
                </Link>
              </li>
            </ul>
            <ul>
              <li className="text-[16px] lg:text-[18px] font-semibold">Páginas</li>
              <li>
                <Link
                  href="/termos"
                  className="text-[#565656] text-[14px] lg:text-[16px] hover:underline"
                  aria-label="Termos de uso"
                >
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#565656] text-[14px] lg:text-[16px] hover:underline"
                  aria-label="Base de conhecimento"
                >
                  Base de conhecimento
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#565656] text-[14px] lg:text-[16px] hover:underline"
                  aria-label="Status de serviços"
                >
                  Status de serviços
                </Link>
              </li>
            </ul>
            <ul>
              <li className="text-[16px] lg:text-[18px] font-semibold">
                Entre em contato
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#565656] text-[14px] lg:text-[16px] hover:underline"
                  aria-label="Discord"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#565656] text-[14px] lg:text-[16px] hover:underline"
                  aria-label="Chat ao vivo"
                >
                  Chat ao vivo
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#565656] text-[14px] lg:text-[16px] hover:underline"
                  aria-label="+55 (21) 99999-9999"
                >
                  +55 (31) 98442-7971
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-[10px]">
            {/* <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
              <PiTwitterLogoFill size={28} />
            </Link>*/}
            <Link href="https://www.instagram.com/featherhost.com.br" target="_blank" aria-label="Instagram">
              <PiInstagramLogoFill size={28} />
            </Link>
            <Link href="https://painel.featherhost.com.br/" target="_blank" aria-label="Painel">
              <SiPterodactyl size={28} />
            </Link>
            {/* <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
              <PiDesktopFill size={28} />
            </Link> */}
          </div>
        </div>
      </Container>
    </footer>
  );
}
