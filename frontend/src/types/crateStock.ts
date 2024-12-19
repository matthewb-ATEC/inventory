import { CrateType } from './crate'
import { StockType } from './stock'

export interface CrateStockType {
  id: number
  crate: CrateType
  stock: StockType
}

export interface CreateCrateStockType {
  crateId: number
  stockId: number
}
