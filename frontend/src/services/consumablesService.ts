import axios from 'axios'
import { ConsumableType } from '../types'

const baseURL = '/api/stock/consumables'

const getAll = async (): Promise<ConsumableType[]> => {
  const response = await axios.get<ConsumableType[]>(baseURL)
  return response.data
}

const getId = async (id: string): Promise<ConsumableType> => {
  const response = await axios.get<ConsumableType>(`${baseURL}/${id}`)
  return response.data
}

const create = async (consumable: ConsumableType): Promise<ConsumableType> => {
  const response = await axios.post<ConsumableType>(baseURL, consumable)
  return response.data
}

const update = async (
  id: string,
  consumable: ConsumableType
): Promise<ConsumableType> => {
  const response = await axios.put<ConsumableType>(
    `${baseURL}/${id}`,
    consumable
  )
  return response.data
}

const remove = async (id: string): Promise<ConsumableType> => {
  const response = await axios.delete<ConsumableType>(`${baseURL}/${id}`)
  return response.data
}

const consumablesService = { getAll, getId, create, update, remove }

export default consumablesService
