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

export interface ItemLocationType {
  id: string
  shelfStockLocation: LocationType
  overstockLocation: LocationType
}

export interface LocationType {
  id: string
  aisle: string
  shelf: string
}
