import { CrateType } from './crate'
import { ShipmentType } from './shipment'

export interface ShipmentCrateType {
  id: number
  shipment: ShipmentType
  crate: CrateType
}

export interface CreateShipmentCrateType {
  shipmentId: number
  crateId: number
}
