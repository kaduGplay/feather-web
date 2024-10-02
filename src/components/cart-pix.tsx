'use client';

import { motion } from 'framer-motion';

import Image from 'next/image';

import CopyToClipboard from 'react-copy-to-clipboard';

import { toast } from 'react-hot-toast';
import { PiX } from 'react-icons/pi';

export function CartPix({
  pixKey,
  pixCode,
  close,
  closeCart,
}: {
  pixKey: string;
  pixCode: string;
  close: () => void;
  closeCart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-50 fixed w-[100vw] h-[100vh] top-0 left-0 bg-black/50"
    >
      <div className="z-50 fixed top-0 left-0 flex items-start justify-center overflow-auto w-[100vw] h-[-webkit-fill-available]">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white dark:bg-black relative w-full max-w-2xl p-8 rounded-xl shadow-sm border border-black/5 my-5 md:my-20"
        >
          <div className="flex items-center justify-between py-8 pt-0">
            <h3 className="flex items-center font-bold text-lg">Pix</h3>
            <div className="flex gap-3 items-center">
              <button
                type="button"
                onClick={close}
                className="text-red-500 hover:text-red-600 px-1 py-1 rounded-full flex items-center gap-2 transition-all duration-300 ease-in disabled:opacity-50"
              >
                <PiX size={24} />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="font-lg font-semibold">Use o QR Code do Pix para pagar</h3>
            <p>
              Abra o app em que vai fazer a transferência, escaneie a imagem ou cole o
              código do QR Code.
            </p>
            <Image
              src={`data:image/gif;base64,${pixCode ? pixCode : ''}`}
              width={300}
              height={300}
              onDragStart={event => event.preventDefault()}
              alt="QR Code do Pix"
            />
            <CopyToClipboard
              text={pixKey ? pixKey : ''}
              onCopy={() => toast.success('Chave Pix copiada com sucesso!')}
            >
              <button className="w-full text-[14px] text-center bg-slate-100 text-indigo-600 py-3 px-8 rounded-lg hover:bg-indigo-700 hover:text-white transition-colors duration-300 ease-in-out mt-8">
                Copiar
              </button>
            </CopyToClipboard>
            <button
              className="w-full text-[14px] text-center bg-green-100 text-green-500 py-3 px-8 rounded-lg hover:bg-green-500 hover:text-green-100 transition-colors duration-300 ease-in-out mt-4"
              onClick={() => {
                close();
                closeCart();

                toast.success('A compra foi finalizada com sucesso.');
              }}
            >
              Finalizar
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
