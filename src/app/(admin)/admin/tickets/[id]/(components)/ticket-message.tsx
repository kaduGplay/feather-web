import { ITicketMessage } from '@src/interfaces';

import { formatDistance } from 'date-fns';

import { ptBR } from 'date-fns/locale';

export function TicketMessage({
  message,
  support,
}: {
  message: ITicketMessage;
  support?: boolean;
}) {
  if (!support) {
    return (
      <div className="flex justify-end items-end">
        <div className="bg-white dark:bg-black shadow-custom flex flex-col gap-[20px] p-3 rounded-lg xl:w-[600px]">
          <div className="flex items-center justify-between">
            <div className="bg-indigo-100 w-fit rounded-full px-3 p-1">
              <p className="text-indigo-600 text-[14px]">Cliente</p>
            </div>
            <div className="flex items-center gap-[20px]">
              <div>
                <h1 className="text-[14px] text-slate-600 font-semibold">
                  {message.customer.name}
                </h1>
                <p className="text-[14px] text-slate-500">
                  Há{' '}
                  {formatDistance(new Date(message.created_at), new Date(), {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="py-[10px] px-[18px] rounded-2xl bg-indigo-600 text-white font-semibold">
                {message.customer.name.charAt(0)}
              </div>
            </div>
          </div>
          <p className="text-[14px] text-slate-600">{message.message}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-white dark:bg-black shadow-custom flex flex-col gap-[20px] p-3 rounded-lg xl:w-[600px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[20px]">
            <div className="py-[10px] px-[18px] rounded-2xl bg-indigo-600 text-white font-semibold">
              {message.customer.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-[14px] text-black dark:text-white font-semibold">
                {message.customer.name}
              </h1>
              <p className="text-[14px] text-black dark:text-white">
                Há{' '}
                {formatDistance(new Date(message.created_at), new Date(), {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>
          <div className="bg-indigo-100 w-fit rounded-full px-3 p-1">
            <p className="text-indigo-600 text-[14px]">Você</p>
          </div>
        </div>
        <p className="text-[14px] text-black dark:text-white">{message.message}</p>
      </div>
    );
  }
}
