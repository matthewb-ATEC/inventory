import { ProjectType } from './project'
import { VendorType } from './vendor'

export enum ShipmentTypeEnum {
  VendorToWarehouse = 'Vendor to Warehouse',
  WarehouseToProject = 'Warehouse to Project',
}

export enum ShipmentStatusEnum {
  Received = 'Received',
  Shipped = 'Shipped',
}

export interface ShipmentType {
  id: number
  type: ShipmentTypeEnum
  status: ShipmentStatusEnum
  project: ProjectType
  vendor: VendorType
}

export interface CreateShipmentType {
  type: ShipmentTypeEnum
  status: ShipmentStatusEnum
  projectId: number
  vendorId: number
}
