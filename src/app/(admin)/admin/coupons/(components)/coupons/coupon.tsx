'use client';

import Link from 'next/link';

import { ICoupon } from '@src/interfaces';

import { format } from 'date-fns';
import { useState } from 'react';
import { apiClient } from '@src/services';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { PiEye, PiTrash } from 'react-icons/pi';

export function Coupon({ id, code, type, value, is_recurrent, expire_at }: ICoupon) {
  const [loading, setLoading] = useState(false);

  async function deleteFunction() {
    setLoading(true);

    await apiClient
      .delete(`/coupons/${id}`)
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
        text: 'Você tem certeza que deseja deletar este cupom?',
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
      <td className="px-6 py-4">{code}</td>
      <td className="px-6 py-4">
        {' '}
        {(type === 'FIXED' && 'Fixo') || (type === 'PERCENT' && 'Porcentagem')}
      </td>
      <td className="px-6 py-4">
        {type === 'FIXED'
          ? value.toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
            })
          : value + '%'}
      </td>
      <td className="px-6 py-4">{is_recurrent ? 'Sim' : 'Não'}</td>
      <td className="px-6 py-4">
        {expire_at
          ? expire_at
            ? format(new Date(expire_at), "dd/MM/yyyy 'às' HH:mm")
            : '...'
          : '-/-'}
      </td>
      <td className="flex items-center gap-2 px-6 py-4">
        <Link href={`/admin/coupons/${id}`}>
          <PiEye size={18} />
        </Link>
        <button type="button" onClick={remove} disabled={loading}>
          <PiTrash size={18} />
        </button>
      </td>
    </tr>
  );
}
