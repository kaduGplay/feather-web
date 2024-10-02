'use client';

import Link from 'next/link';

import { ICustomerService } from '@src/interfaces';

import { format } from 'date-fns';
import { PiEye, PiTrash } from 'react-icons/pi';

export function Service({ id, customer_id, service, expires_at }: ICustomerService) {
  const { name, type, serviceLocation, price } = service;

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
      <td className="flex items-center gap-2 px-6 py-4">
        <Link href={`/dashboard/services/${id}`}>
          <PiEye size={18} />
        </Link>
      </td>
    </tr>
  );
}
