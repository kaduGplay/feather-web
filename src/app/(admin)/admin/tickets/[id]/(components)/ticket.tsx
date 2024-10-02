'use client';

import { useEffect, useRef, useState } from 'react';

import { Container } from '@src/components';

import { TicketMessage } from '.';

import { ITicket } from '@src/interfaces';
import { apiClient } from '@src/services';
import toast from 'react-hot-toast';

export function Ticket({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const [ticket, setTicket] = useState<ITicket | null>();

  const [message, setMessage] = useState('');

  async function reply() {
    if (!message) {
      toast.error('Você precisa inserir a mensagem.');

      return setLoadingMessage(true);
    }

    await apiClient
      .post(`/customer/tickets/reply/${id}`, {
        message,
      })
      .then(response => {
        toast.success('Mensagem enviada com sucesso.');

        setMessage('');

        getTicket();

        setLoadingMessage(false);
      })
      .catch(error => {
        toast.error(error.response.data.error);
      });
  }

  async function getTicket() {
    setLoading(true);

    await apiClient
      .get(`/customer/tickets/${id}`)
      .then(response => {
        setTicket(response.data);

        setLoading(false);
      })
      .catch(error => {
        toast.error(error.response.data.error);
      });
  }

  useEffect(() => {
    getTicket();
  }, []);

  const bottomOfMessagesRef = useRef<any>();

  useEffect(() => {
    bottomOfMessagesRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [loading]);

  return (
    <div className="lg:w-[800px] mx-auto bg-gray-200 dark:bg-dark-100 p-2 rounded-md">
      <Container>
        <h1 className="text-[22px] font-semibold mb-8">Visualizando ticket</h1>
        <div className="bg-white dark:bg-black p-8 rounded-md flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-black dark:text-white">
              {ticket ? ticket.subject : '...'}
            </h1>
            <div className="flex flex-row gap-3">
              <div className="w-fit bg-black dark:bg-white text-white dark:text-black text-[12px] p-1 rounded-full">
                Aguardando resposta
              </div>
              <div className="w-fit bg-black dark:bg-white text-white dark:text-black text-[12px] p-1 rounded-full">
                Suporte Técnico
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[20px] bg-light-100 dark:bg-dark-100 h-[500px] overflow-y-auto rounded-md p-6">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => <div key={index}></div>)
            ) : ticket && ticket.customerTicketMessage.length > 0 ? (
              ticket.customerTicketMessage.map((message, index) => (
                <TicketMessage
                  key={index}
                  message={message}
                  support={ticket.customer_id !== message.customer_id}
                />
              ))
            ) : (
              <div></div>
            )}
            <div ref={bottomOfMessagesRef}></div>
          </div>
          <div className="relative">
            <textarea
              className="w-full p-3 bg-light-100 dark:bg-dark-100 rounded-md outline-none"
              rows={4}
              placeholder="Insira sua mensagem"
              required
              value={message}
              readOnly={loading || loadingMessage}
              onChange={event => setMessage(event.target.value)}
            ></textarea>
            <button
              className="absolute bottom-7 right-5 text-[14px] bg-black hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white py-2 px-2 rounded-[15px] transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={reply}
            >
              Enviar
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
