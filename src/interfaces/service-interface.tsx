import { IServiceLocation } from '.';

export interface IService {
  id: string;
  name: string;
  price: number;
  type: string;
  service_location_id: string;
  serviceLocation: IServiceLocation;
  features: string;
  cpu?: number;
  ram?: number;
  disk?: number;
  slots?: number;
  ips?: number;
  uplink?: string;
  external_cloud_id?: string;
  external_cloud_space_uuid?: string;
  installation_fee?: number;
  discount: boolean;
  created_at: number;
  updated_at: number;
}
