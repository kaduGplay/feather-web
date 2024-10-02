import { ICustomer } from '.';

export interface ITicket {
  id: string;
  customer_id: string;
  customer: ICustomer;
  subject: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  department: 'TECHNICAL' | 'FINANCIAL' | 'PARTNERSHIP' | 'ORDER' | 'OTHER';
  customerTicketMessage: ITicketMessage[];
  status:
    | 'OPEN'
    | 'AWAITING_CUSTOMER_RESPONSE'
    | 'AWAITING_SUPPORT_RESPONSE'
    | 'ON_HOLD'
    | 'CLOSED';
  created_at: Date;
  updated_at: Date;
}

export interface ITicketMessage {
  id: string;
  ticket_id: string;
  customer_id: string;
  who_reply: 'CUSTOMER' | 'SUPPORT';
  customer: ICustomer;
  message: string;
  created_at: Date;
  updated_at: Date;
}
