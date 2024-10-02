import { ICustomer, ICustomerServiceInvoice, IService } from '.';

export interface ICustomerService {
  id: string;
  customer_id: string;
  customer: ICustomer;
  service_id: string;
  hostname?: string;
  price_custom?: number;
  first_payment_price?: number;
  recurring_price?: number;
  payment_cycle: 'MONTHLY' | 'QUARTERLY' | 'SEMESTERLY' | 'YEARLY';
  suspension_reason?: string;
  customerServiceDetail: ICustomerServiceDetails;
  customerServiceInvoice: ICustomerServiceInvoice[];
  service: IService;
  expires_at: Date;
  status:
    | 'PENDING'
    | 'ACTIVE'
    | 'SUSPENDED'
    | 'CANCELED'
    | 'WAITING_FOR_DELIVERY'
    | 'DELIVERED_AND_ACTIVE';
  created_at: Date;
  updated_at: Date;
}

export interface ICustomerServiceDetails {
  id: string;
  customer_id: string;
  customer_service_id: string;
  external_service_id: string;
  cloud_os_id?: string;
  pterodactyl_service_id?: string;
  ip?: string;
  user?: string;
  password?: string;
  vnc_ip?: string;
  vnc_password?: string;
  nameserver_primary?: string;
  nameserver_secondary?: string;
  created_at: Date;
  updated_at: Date;
}
