'use client';

import { useState } from 'react';

import { Container } from '@src/components';

import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { apiClient } from '@src/services';
import toast from 'react-hot-toast';

interface IFormData {
  subject: string;
  department: 'TECHNICAL' | 'FINANCIAL' | 'PARTNERSHIP' | 'ORDER' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  message: string;
}

export function TicketOpenForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  async function onSubmit({ subject, department, priority, message }: IFormData) {
    setLoading(true);

    if (!subject || !department || !priority || !message) {
      return setLoading(false);
    }

    await apiClient
      .post('/customer/tickets', {
        subject,
        department,
        priority,
        message,
      })
      .then(response => {
        toast.success('O ticket foi aberto com sucesso!');

        window.location.href = `/dashboard/tickets/${response.data.id}`;
      })
      .catch(error => {
        toast.error(error.response.data.message);

        setLoading(false);
      });
  }

  return (
    <div className="mx-auto">
      <Container>
        <h1 className="text-[22px] font-semibold my-8">Abrir ticket</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-[14px] md:text-[15px] font-light">
              Assunto
            </label>
            <input
              id="subject"
              type="text"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.subject && 'outline-red-500'
              }`}
              placeholder="Insira o assunto"
              readOnly={loading}
              {...register('subject', { required: true })}
            />
            {errors.subject && (
              <p className="text-[14px] text-red-500">Você precisa inserir o assunto.</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="department" className="text-[14px] md:text-[15px] font-light">
              Departamento
            </label>
            <select
              id="department"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.department && 'outline-red-500'
              }`}
              disabled={loading}
              {...register('department', { required: true })}
            >
              <option value="" selected>
                Selecione
              </option>
              <option value="TECHNICAL">Suporte Técnico</option>
              <option value="FINANCIAL">Suporte Financeiro</option>
              <option value="PARTNERSHIP">Parcerias</option>
              <option value="OTHER">Outros</option>
            </select>
            {errors.department && (
              <p className="text-[14px] text-red-500">
                Você precisa selecionar o departamento.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="priority" className="text-[14px] md:text-[15px] font-light">
              Prioridade
            </label>
            <select
              id="priority"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.priority && 'outline-red-500'
              }`}
              disabled={loading}
              {...register('priority', { required: true })}
            >
              <option value="" selected>
                Selecione
              </option>
              <option value="LOW">Baixa</option>
              <option value="MEDIUM">Média</option>
              <option value="HIGH">Alta</option>
            </select>
            {errors.priority && (
              <p className="text-[14px] text-red-500">
                Você precisa selecionar a prioridade.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[14px] md:text-[15px] font-light">
              Mensagem
            </label>
            <textarea
              id="message"
              className={`bg-white dark:bg-black p-3 rounded-lg text-[14px] md:text-[15px] font-light ${
                errors.subject && 'outline-red-500'
              }`}
              rows={4}
              placeholder="Insira a mensagem"
              readOnly={loading}
              {...register('message', { required: true })}
            />
            {errors.subject && (
              <p className="text-[14px] text-red-500">Você precisa inserir a mensagem.</p>
            )}
          </div>
          <button
            type="submit"
            className={`text-[14px] lg:text-[16px] bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black py-[10px] px-[25px] rounded-md transition-all ease-in-out duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Abrir ticket"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <RiLoader5Fill className="animate-spin" size={24} /> Carregando...
              </span>
            ) : (
              'Abrir ticket'
            )}
          </button>
        </form>
      </Container>
    </div>
  );
}
