import axios from 'axios'
import { ProjectType } from '../../types'

const baseURL = '/api/procore/projects'

const getAll = async (): Promise<ProjectType[]> => {
  const response = await axios.get<ProjectType[]>(baseURL)
  return response.data
}

const getId = async (id: string): Promise<ProjectType> => {
  const response = await axios.get<ProjectType>(`${baseURL}/${id}`)
  return response.data
}

const create = async (project: ProjectType): Promise<ProjectType> => {
  const response = await axios.post<ProjectType>(baseURL, project)
  return response.data
}

const update = async (
  id: string,
  project: ProjectType
): Promise<ProjectType> => {
  const response = await axios.put<ProjectType>(`${baseURL}/${id}`, project)
  return response.data
}

const remove = async (id: string): Promise<ProjectType> => {
  const response = await axios.delete<ProjectType>(`${baseURL}/${id}`)
  return response.data
}

const projectsService = { getAll, getId, create, update, remove }

export default projectsService
