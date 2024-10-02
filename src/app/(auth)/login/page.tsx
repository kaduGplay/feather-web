import Link from 'next/link';
import Image from 'next/image';

import { Container, Logo, Logotipo } from '@src/components';

import { LoginForm } from './(components)';

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-5">
      <div className=" hidden lg:flex items-end justify-end h-full min-h-[95.8vh] bg-gray-100 dark:bg-dark-100 rounded-md pb-8">
        <Container>
          <div className="flex flex-col gap-3">
            <Image src="/svgs/man.svg" width={250} height={250} alt="Login" />
            <h1 className="text-[30px]">Entre na sua conta</h1>
            <p className="text-[14px] md:text-[15px] 2xl:w-[500px] font-light">
              Você precisa informar os seus dados para entrar me sua conta para começar a
              gerenciar seus serviços.
            </p>
          </div>
        </Container>
      </div>
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
                Bem-vindo de volta
              </h1>
              <p className="text-[14px] md:text-[15px] font-light">
                Insira o seu e-mail e senha para acessar a sua conta.
              </p>
            </div>
            <LoginForm />
          </div>
          <p>
            <span className="text-gray-600 font-light">Não tem uma conta?</span>{' '}
            <Link href="/register" className="font-medium">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
