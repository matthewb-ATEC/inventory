export interface MaterialType {
  id: number
  name: string
  vendor: string
  size: string
  units: string
  tag: string
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
