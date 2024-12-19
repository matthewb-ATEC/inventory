import { ProjectType } from './project'

export interface RequestType {
  id: number
  project: ProjectType
}

export interface CreateRequestType {
  projectId: number
}
