import { Metadata } from 'next';

import { Container } from '@src/components';
import { PiFolderFill } from 'react-icons/pi';
import { Blogs } from './(components)';

export const metadata: Metadata = {
  title: 'Central de Ajuda | FeatherHost',
  twitter: {
    title: 'Central de Ajuda | FeatherHost',
  },
};

export default function Page() {
  return (
    <main>
      <Container>
        <div className="relative flex flex-col justify-center items-center bg-light-100 dark:bg-dark-100 rounded-md px-[50px] xl:px-[100px] 2xl:px-[150px] py-[100px] mt-[30px] gap-3">
          <div className="flex flex-col justify-center items-center text-center pb-[50px]">
            <h1 className="text-[26px] text-black dark:text-white font-semibold">
              Bem-Vindo a nossa Central de Ajuda!
            </h1>
            <p className=" lg:w-[400px] text-[#5E5E5E]">
              Aqui serão esclarecidas todas as suas duvidas ou duvidas frequentes que
              nossos membros da featherhost possui.
            </p>
          </div>
          <Blogs />
        </div>
      </Container>
    </main>
  );
}
