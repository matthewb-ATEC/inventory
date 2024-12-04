import axios from 'axios'
import { StockType } from '../types'

const baseURL = '/api/stock'

const getAll = async (): Promise<StockType[]> => {
  const response = await axios.get<StockType[]>(baseURL)
  return response.data
}

const getItemStock = async (itemId: string): Promise<StockType> => {
  const response = await axios.get<StockType>(`${baseURL}/${itemId}`)
  return response.data
}

const create = async (stock: StockType): Promise<StockType> => {
  const response = await axios.post<StockType>(baseURL, stock)
  return response.data
}

const update = async (id: string, stock: StockType): Promise<StockType> => {
  const response = await axios.put<StockType>(`${baseURL}/${id}`, stock)
  return response.data
}

const remove = async (id: string): Promise<StockType> => {
  const response = await axios.delete<StockType>(`${baseURL}/${id}`)
  return response.data
}

const stockService = { getAll, getItemStock, create, update, remove }

export default stockService
