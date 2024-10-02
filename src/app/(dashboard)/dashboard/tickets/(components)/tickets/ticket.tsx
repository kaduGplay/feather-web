'use client';
import Link from 'next/link';

import { ITicket } from '@src/interfaces';

import { format } from 'date-fns';
import { PiEye, PiTrash, PiX } from 'react-icons/pi';
import { useState } from 'react';
import { apiClient } from '@src/services';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export function Ticket({
  id,
  subject,
  department,
  priority,
  status,
  updated_at,
}: ITicket) {
  const [loading, setLoading] = useState(false);

  async function deleteFunction() {
    await apiClient
      .delete(`/customer/tickets/${id}`)
      .then(response => {
        toast.success(response.data.message);

        window.location.reload();
      })
      .catch(error => {
        toast.error(error.response.data.error);
      });

    setLoading(false);
  }

  async function remove() {
    try {
      Swal.fire({
        title: 'Confirmação',
        text: 'Você tem certeza que deseja fechar este ticket?',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#22c55e',
        denyButtonColor: '#D1D5DB',
        confirmButtonText: 'Sim, fechar',
        denyButtonText: 'Cancelar',
      }).then(async result => {
        if (result.isConfirmed) {
          setLoading(true);

          deleteFunction();
        }
      });
    } catch (error: any) {
      toast.error(error.response.data.message);

      setLoading(false);
    }
  }

  return (
    <tr className="text-[14px]">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        #{id.split('-')[0]}
      </th>
      <td className="px-6 py-4">{subject}</td>
      <td className="px-6 py-4">
        {(department == 'TECHNICAL' && 'Suporte Técnico') ||
          (department == 'FINANCIAL' && 'Suporte Financeiro') ||
          (department == 'PARTNERSHIP' && 'Parcerias') ||
          (department == 'ORDER' && 'Orçamento') ||
          (department == 'OTHER' && 'Outros')}
      </td>
      <td className="px-6 py-4">
        {(priority == 'LOW' && 'Baixa') ||
          (priority == 'MEDIUM' && 'Média') ||
          (priority == 'HIGH' && 'Alta')}
      </td>
      <td className="px-6 py-4">
        {updated_at ? format(new Date(updated_at), "dd/MM/yyyy 'às' HH:mm") : null}
      </td>
      <td className="px-6 py-4">
        {(status == 'OPEN' && 'Aberto') ||
          (status == 'AWAITING_CUSTOMER_RESPONSE' && 'Respondido') ||
          (status == 'AWAITING_SUPPORT_RESPONSE' && 'Aguardando resposta') ||
          (status == 'CLOSED' && 'Fechado')}
      </td>
      <td className="flex items-center gap-2 px-6 py-4">
        <Link href={`/dashboard/tickets/${id}`}>
          <PiEye size={18} />
        </Link>
        <button type="button" onClick={remove} disabled={loading}>
          <PiX size={18} />
        </button>
      </td>
    </tr>
  );
}
