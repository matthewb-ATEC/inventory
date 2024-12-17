import { VendorType } from './vendor'

export interface MaterialType {
  id: number
  partNumber: string
  description: string
  thicknessInches: number | null
  widthInches: number | null
  lengthInches: number | null
  squareFeet: number | null
  color: string | null
  tag: string | null
  vendor: VendorType
}

export interface CreateMaterialType {
  partNumber: string
  description: string
  thicknessInches?: number
  widthInches?: number
  lengthInches?: number
  squareFeet?: number
  color?: string
  tag?: string
  vendorId: number
}
