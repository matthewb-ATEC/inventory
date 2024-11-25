import axios from 'axios'
import { ProductivityType } from '../../types'

const baseURL = '/api/procore/productivities'

const getAll = async (): Promise<ProductivityType[]> => {
  const response = await axios.get<ProductivityType[]>(baseURL)
  return response.data
}

const getId = async (id: string): Promise<ProductivityType> => {
  const response = await axios.get<ProductivityType>(`${baseURL}/${id}`)
  return response.data
}

const create = async (
  productivity: ProductivityType
): Promise<ProductivityType> => {
  const response = await axios.post<ProductivityType>(baseURL, productivity)
  return response.data
}

const update = async (
  id: string,
  productivity: ProductivityType
): Promise<ProductivityType> => {
  const response = await axios.put<ProductivityType>(
    `${baseURL}/${id}`,
    productivity
  )
  return response.data
}

const remove = async (id: string): Promise<ProductivityType> => {
  const response = await axios.delete<ProductivityType>(`${baseURL}/${id}`)
  return response.data
}

const productivitiesService = { getAll, getId, create, update, remove }

export default productivitiesService
