import { RequestType } from './request'
import { StockType } from './stock'

export interface RequestStockType {
  id: number
  request: RequestType
  stock: StockType
}

export interface CreateRequestStockType {
  requestId: number
  stockId: number
}
