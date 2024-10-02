'use client';

import Link from 'next/link';

import { ICustomerService } from '@src/interfaces';

import { format } from 'date-fns';
import { useState } from 'react';
import { apiClient } from '@src/services';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { PiEye, PiTrash } from 'react-icons/pi';

export function LastService({
  id,
  customer_id,
  service,
  expires_at,
  status,
}: ICustomerService) {
  const [loading, setLoading] = useState(false);

  const { name, type, serviceLocation, price } = service;

  async function deleteFunction() {
    setLoading(true);

    await apiClient
      .delete(`/customer/services/${id}`)
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
        text: 'Você tem certeza que deseja deletar este serviço?',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#22c55e',
        denyButtonColor: '#D1D5DB',
        confirmButtonText: 'Sim, deletar',
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
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{type}</td>
      <td className="px-6 py-4">{serviceLocation.name}</td>
      <td className="px-6 py-4">
        {price.toLocaleString('pt-br', {
          currency: 'BRL',
          style: 'currency',
        })}
      </td>
      <td className="px-6 py-4">
        {expires_at ? format(new Date(expires_at), "dd/MM/yyyy 'às' HH:mm") : null}
      </td>
      <td className="px-6 py-4">
        {(status == 'PENDING' && 'Pagamento pendente') ||
          (status == 'ACTIVE' && 'Ativo') ||
          (status == 'SUSPENDED' && 'Suspenso') ||
          (status == 'CANCELED' && 'Cancelado') ||
          (status == 'WAITING_FOR_DELIVERY' && 'Aguardando entrega') ||
          (status == 'DELIVERED_AND_ACTIVE' && 'Entregue e ativo')}
      </td>
      <td className="flex items-center gap-2 px-6 py-4">
        <Link href={`/admin/customers/${customer_id}/services/${id}`}>
          <PiEye size={18} />
        </Link>
        <button type="button" onClick={remove} disabled={loading}>
          <PiTrash size={18} />
        </button>
      </td>
    </tr>
  );
}
