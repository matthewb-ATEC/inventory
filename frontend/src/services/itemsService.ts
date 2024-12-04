import axios from 'axios'
import { ItemType } from '../types'

const baseURL = '/api/item'

const getAll = async (): Promise<ItemType[]> => {
  const response = await axios.get<ItemType[]>(baseURL)
  return response.data
}

const getId = async (id: string): Promise<ItemType> => {
  const response = await axios.get<ItemType>(`${baseURL}/${id}`)
  return response.data
}

const create = async (item: ItemType): Promise<ItemType> => {
  const response = await axios.post<ItemType>(baseURL, item)
  return response.data
}

const update = async (id: string, item: ItemType): Promise<ItemType> => {
  const response = await axios.put<ItemType>(`${baseURL}/${id}`, item)
  return response.data
}

const remove = async (sku: string): Promise<ItemType> => {
  const response = await axios.delete<ItemType>(`${baseURL}/${sku}`)
  return response.data
}

const itemsService = { getAll, getId, create, update, remove }

export default itemsService
