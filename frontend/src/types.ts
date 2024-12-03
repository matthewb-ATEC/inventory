export interface DeliveryType {
  delivery?: string
}

export interface CompanyType {
  company?: string
}

export interface ProjectType {
  project?: string
}

export interface ProductivityType {
  productivity?: string
}

export interface AuthenticationType {
  authentication?: string
}

export interface ConsumableType {
  id: string
  type: string
  category: string
  sku: string
  name: string
  unitOfMeasure: string
  totalStock: number
  availableStock: number
  shelfStock: number
  overStock: number
  shelfStockLocation: string
  overStockLocation: string
}
