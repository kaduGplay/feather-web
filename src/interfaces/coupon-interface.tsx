export interface ICoupon {
  id: string;
  code: string;
  type: 'PERCENT' | 'FIXED';
  value: number;
  is_recurrent: boolean;
  active: boolean;
  expire_at: Date;
  created_at: Date;
  updated_at: Date;
}
