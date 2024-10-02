import { ICoupon, ICustomer, ICustomerService } from '.';

export interface ICustomerServiceInvoice {
  id: string;
  customer_id: string;
  customer: ICustomer;
  customer_service_id: string;
  customerService: ICustomerService;
  value: number;
  type: 'PAY_SERVICE' | 'RENEW_SERVICE' | 'UPGRADE_SERVICE';
  payment_method: 'MERCADO_PAGO' | 'PIX' | 'PAYPAL';
  external_reference: string;
  warning_attempts: number;
  coupon_id?: string;
  coupon: ICoupon;
  status: 'PENDING' | 'PAID' | 'CANCELED' | 'IN_ANALYSIS' | 'REFUNDED' | 'FRAUD';
  paid_at?: Date;
  expires_at?: Date;
  created_at: Date;
  updated_at: Date;
}
