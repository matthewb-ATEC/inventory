import axios from 'axios'
import { CreateCrateType, CrateType } from '../types/crate'

const baseURL = '/api/crates'

const getAll = async (): Promise<CrateType[]> => {
  const response = await axios.get<CrateType[]>(baseURL)
  return response.data
}

const create = async (crate: CreateCrateType): Promise<CrateType> => {
  const response = await axios.post<CrateType>(baseURL, crate)
  return response.data
}

const update = async (id: number, crate: CrateType): Promise<CrateType> => {
  const response = await axios.put<CrateType>(`${baseURL}/${id}/`, crate)
  return response.data
}

const remove = async (id: number): Promise<CrateType> => {
  const response = await axios.delete<CrateType>(`${baseURL}/${id}`)
  return response.data
}

const removeAll = async (): Promise<CrateType> => {
  const response = await axios.delete<CrateType>(baseURL)
  return response.data
}

const cratesService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
}

export default cratesService
