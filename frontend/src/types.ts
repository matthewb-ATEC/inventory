export interface MaterialType {
  id: number
  partNumber: string
  //vendor: string
  partDescription: string
  size: string
  color: string
}

export interface ProjectType {
  number: number
  name: string
}

export interface InventoryType {
  id: number
  material: MaterialType
  project: ProjectType
  quantity: number
  sqft: number
}
