import { MaterialType } from './material'

export interface StockType {
  id: number
  material: MaterialType
  quantity: number
}

export interface CreateStockType {
  materialId: number
  quantity: number
}
