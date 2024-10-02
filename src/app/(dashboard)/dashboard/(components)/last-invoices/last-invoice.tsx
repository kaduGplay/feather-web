import Link from 'next/link';

import { ICustomerServiceInvoice } from '@src/interfaces';

import { format } from 'date-fns';
import { PiEye } from 'react-icons/pi';

export function LastInvoice({
  id,
  updated_at,
  customerService,
  value,
  payment_method,
  status,
}: ICustomerServiceInvoice) {
  return (
    <tr className="text-[14px]">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        #{id.split('-')[0]}
      </th>
      <td className="px-6 py-4">{customerService.service.name}</td>
      <td className="px-6 py-4">{payment_method}</td>
      <td className="px-6 py-4">
        {value.toLocaleString('pt-br', {
          currency: 'BRL',
          style: 'currency',
        })}
      </td>
      <td className="px-6 py-4">
        {updated_at ? format(new Date(updated_at), "dd/MM/yyyy 'às' HH:mm") : null}
      </td>
      <td className="px-6 py-4">
        {(status == 'PENDING' && 'Pagamento pendente') ||
          (status == 'PAID' && 'Pago') ||
          (status == 'CANCELED' && 'Cancelado') ||
          (status == 'IN_ANALYSIS' && 'Em analise') ||
          (status == 'REFUNDED' && 'Reembolsado') ||
          (status == 'FRAUD' && 'Fraude')}
      </td>
      <td className="flex items-center gap-2 px-6 py-4">
        <Link href={`/dashboard/invoices/${id}`}>
          <PiEye size={18} />
        </Link>
      </td>
    </tr>
  );
}
