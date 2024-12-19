import axios from 'axios'
import { CreateRequestStockType, RequestStockType } from '../types/requestStock'

const baseURL = '/api/requestStock'

const getAll = async (): Promise<RequestStockType[]> => {
  const response = await axios.get<RequestStockType[]>(baseURL)
  return response.data
}

const create = async (
  requestStock: CreateRequestStockType
): Promise<RequestStockType> => {
  const response = await axios.post<RequestStockType>(baseURL, requestStock)
  return response.data
}

const update = async (
  id: number,
  requestStock: RequestStockType
): Promise<RequestStockType> => {
  const response = await axios.put<RequestStockType>(
    `${baseURL}/${id}/`,
    requestStock
  )
  return response.data
}

const remove = async (id: number): Promise<RequestStockType> => {
  const response = await axios.delete<RequestStockType>(`${baseURL}/${id}`)
  return response.data
}

const removeAll = async (): Promise<RequestStockType> => {
  const response = await axios.delete<RequestStockType>(baseURL)
  return response.data
}

const requestStockService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
}

export default requestStockService
