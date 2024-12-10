import axios from 'axios'
import { ProjectType } from '../types'

const baseURL = '/api/projects'

const getAll = async (): Promise<ProjectType[]> => {
  const response = await axios.get<ProjectType[]>(baseURL)
  return response.data
}

const create = async (stock: ProjectType): Promise<ProjectType> => {
  const response = await axios.post<ProjectType>(baseURL, stock)
  return response.data
}

const update = async (
  id: number,
  project: ProjectType
): Promise<ProjectType> => {
  const response = await axios.put<ProjectType>(`${baseURL}/${id}/`, project)
  return response.data
}

const remove = async (id: number): Promise<ProjectType> => {
  const response = await axios.delete<ProjectType>(`${baseURL}/${id}`)
  return response.data
}

const projectsService = {
  getAll,
  create,
  update,
  remove,
}

export default projectsService
