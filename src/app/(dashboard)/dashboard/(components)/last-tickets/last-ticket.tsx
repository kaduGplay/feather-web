import Link from 'next/link';

import { ITicket } from '@src/interfaces';

import { format } from 'date-fns';
import { PiEye } from 'react-icons/pi';

export function LastTicket({
  id,
  subject,
  department,
  priority,
  status,
  updated_at,
}: ITicket) {
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
      </td>
    </tr>
  );
}
