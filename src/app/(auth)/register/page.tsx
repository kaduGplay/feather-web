import Link from 'next/link';
import Image from 'next/image';

import { Container, Logo, Logotipo } from '@src/components';

import { RegisterForm } from './(components)';

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-5">
      <div className="w-full h-full relative flex min-h-[90vh] justify-center lg:col-span-2">
        <div className="flex flex-col justify-between items-center py-6">
          <Link href="/" aria-label="FeatherHost">
            <div className="flex items-center gap-1">
              <Logotipo width={50} height={50} />
            </div>
          </Link>
          <div className="flex flex-col gap-12">
            <div className="text-center">
              <h1 className="text-[30px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#000] to-[#414141] dark:from-[#fff] dark:to-[#E8E8E8] to-50%">
                Bem-vindo novato
              </h1>
              <p className="text-[14px] md:text-[15px] font-light">
                Insira os seus dados para criar uma nova conta.
              </p>
            </div>
            <RegisterForm />
          </div>
          <p>
            <span className="text-gray-600 font-light">Já tem uma conta?</span>{' '}
            <Link href="/login" className="font-medium">
              Entre agora
            </Link>
          </p>
        </div>
      </div>
      <div className=" hidden lg:flex items-end justify-end h-full min-h-[95.8vh] bg-light-100 dark:bg-dark-100 rounded-md pb-8">
        <Container>
          <div className="flex justify-end items-end text-end flex-col gap-3">
            <Image
              src="/svgs/man.svg"
              width={250}
              height={250}
              className="-scale-x-100"
              alt="Register"
            />
            <h1 className="text-[30px]">Crie uma conta</h1>
            <p className="text-[14px] md:text-[15px] 2xl:w-[500px] font-light">
              Você precisa informar os seus dados para criar uma conta para começar a
              gerenciar seus serviços.
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
