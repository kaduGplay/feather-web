import Link from 'next/link';

import { ICustomerService } from '@src/interfaces';

import { format } from 'date-fns';
import { PiEye } from 'react-icons/pi';

export function Service({ id, expires_at, service, status }: ICustomerService) {
  return (
    <tr className="text-[14px]">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        #{id.split('-')[0]}
      </th>
      <td className="px-6 py-4">{service.name}</td>
      <td className="px-6 py-4">{service.serviceLocation.name}</td>
      <td className="px-6 py-4">
        {service.price.toLocaleString('pt-br', {
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
        <Link href={`/dashboard/services/${id}`}>
          <PiEye size={18} />
        </Link>
      </td>
    </tr>
  );
}
