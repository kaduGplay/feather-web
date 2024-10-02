import '../globals.css';

import type { Metadata } from 'next';

import { Lexend } from 'next/font/google';

import { ThemeProvider } from '@src/providers';
import { Toaster } from 'react-hot-toast';

import { Footer } from '@src/components/dashboard';
import { AuthProvider } from '@src/contexts';
import { useAuthAdmin } from '@src/functions';
import { redirect } from 'next/navigation';
import { BarProvider } from '@src/components/admin';
import { Navbar } from '@src/components/admin/nav-bar';

const lexend = Lexend({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Administração | FeatherHost',
  description:
    'Os melhores preços de servidores e hospedagens no Brasil e Canadá. Adquira agora uma hospedagem e não se arrependa com garantia de 7 dias de reembolso.',
  twitter: {
    title: 'Hospedagem de Minecraft | Host de minecraft | FeatherHost',
    description:
      'Os melhores preços de servidores e hospedagens no Brasil e Canadá. Adquira agora uma hospedagem e não se arrependa com garantia de 7 dias de reembolso.',
    images: [
      {
        url: 'https://i.imgur.com/bqIGovm.png',
      },
    ],
  },
  keywords: [
    'feather',
    'featherhost',
    'feather host',
    'featherhosting',
    'feather hosting',
    'minecraft',
    'host de minecraft',
    'mta',
    'host de mta',
    'rust',
    'host de rust',
    'host de bot',
    'host de bot discord',
    'host de bot py',
    'host de bot js',
    'host de banco de dados',
    'servidor vps',
    'servidores vps',
    'servidor dedicado',
    'servidores dedicado',
  ],
  robots: 'index, follow',
  authors: [
    {
      name: 'Moonkode',
      url: 'https://moonkode.com.br',
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { validadeToken } = useAuthAdmin(() => redirect('/dashboard'));

  await validadeToken();

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${lexend.className} bg-white dark:bg-black`}>
        <AuthProvider>
          <ThemeProvider attribute="class">
            <Navbar />
            <BarProvider>
              <Toaster position="bottom-center" />
              {children}
              <Footer />
            </BarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
