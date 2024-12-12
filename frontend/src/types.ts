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
  project: ProjectType | null
  quantity: number
}

export type NotificationStatus =
  | 'success'
  | 'error'
  | 'warn'
  | 'ready'
  | 'info'
  | 'default'

export interface NotificationType {
  title?: string
  message?: string | string[]
  status?: NotificationStatus
  symbol?: boolean
  border?: boolean
  closable?: boolean
}
