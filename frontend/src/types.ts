export interface MaterialType {
  id: number
  partNumber: string
  partDescription: string
  size: string | null
  color: string | null
  vendor: string
  tag: string | null
}

export interface ProjectType {
  number: number
  name: string
}

export interface VendorType {
  name: string
}

export interface StockType {
  id: number
  material: MaterialType
  project: string | null
  quantity: number
}
