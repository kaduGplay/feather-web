import { ICustomerService, ICustomerServiceInvoice } from '.';

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'CUSTOMER' | 'SUPPORT' | 'ADMIN';
  customerDocument: ICustomerDocument;
  customerService: ICustomerService[];
  customerServiceInvoice: ICustomerServiceInvoice[];
  is_active: boolean;
  last_login: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ICustomerDocument {
  id: string;
  customer_id: string;
  document_type: 'CPF' | 'CNPJ';
  document: string;
  created_at: Date;
  updated_at: Date;
}
