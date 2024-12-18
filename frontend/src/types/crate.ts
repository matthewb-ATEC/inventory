import { LocationType } from './location'
import { ProjectType } from './project'

export interface CrateType {
  id: number
  number: string
  location: LocationType
  project: ProjectType
}

export interface CreateCrateType {
  number: string
  locationId: number
  projectId: number
}
