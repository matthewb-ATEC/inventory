export interface ItemType {
  id: string
  type: string
  category: string
  sku: string
  name: string
  unitOfMeasure: string
}

export interface StockType {
  id: string
  item: ItemType
  totalStock: number
  shelfStock: number
  overStock: number
}
