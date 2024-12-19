import axios from 'axios'
import { CreateCrateStockType, CrateStockType } from '../types/crateStock'

const baseURL = '/api/crateStock'

const getAll = async (): Promise<CrateStockType[]> => {
  const response = await axios.get<CrateStockType[]>(baseURL)
  return response.data
}

const create = async (
  crateStock: CreateCrateStockType
): Promise<CrateStockType> => {
  const response = await axios.post<CrateStockType>(baseURL, crateStock)
  return response.data
}

const update = async (
  id: number,
  crateStock: CrateStockType
): Promise<CrateStockType> => {
  const response = await axios.put<CrateStockType>(
    `${baseURL}/${id}/`,
    crateStock
  )
  return response.data
}

const remove = async (id: number): Promise<CrateStockType> => {
  const response = await axios.delete<CrateStockType>(`${baseURL}/${id}`)
  return response.data
}

const removeAll = async (): Promise<CrateStockType> => {
  const response = await axios.delete<CrateStockType>(baseURL)
  return response.data
}

const crateStockService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
}

export default crateStockService
