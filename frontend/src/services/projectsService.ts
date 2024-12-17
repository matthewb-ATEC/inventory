import axios from 'axios'
import { CreateProjectType, ProjectType } from '../types/project'

const baseURL = '/api/projects'

const getAll = async (): Promise<ProjectType[]> => {
  const response = await axios.get<ProjectType[]>(baseURL)
  return response.data
}

const create = async (project: CreateProjectType): Promise<ProjectType> => {
  const response = await axios.post<ProjectType>(baseURL, project)
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

const removeAll = async (): Promise<ProjectType> => {
  const response = await axios.delete<ProjectType>(baseURL)
  return response.data
}

const projectsService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
}

export default projectsService
