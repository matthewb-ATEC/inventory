import axios from 'axios'
import { MaterialType, StockType } from '../types'

const baseURL = '/api/stocks'

const getAll = async (): Promise<StockType[]> => {
  const response = await axios.get<StockType[]>(baseURL)
  return response.data
}

const getMaterialStock = async (
  material: MaterialType,
  stock: StockType
): Promise<StockType> => {
  const response = await axios.get<StockType>(
    `${baseURL}/material/${material.partNumber}/${stock.project}`
  )
  return response.data
}

const create = async (stock: StockType): Promise<StockType> => {
  const response = await axios.post<StockType>(baseURL, stock)
  return response.data
}

const updateQuantity = async (
  id: number,
  newStock: StockType
): Promise<StockType> => {
  const response = await axios.put<StockType>(
    `${baseURL}/${id}/quantity`,
    newStock
  )
  return response.data
}

const remove = async (id: number): Promise<StockType> => {
  const response = await axios.delete<StockType>(`${baseURL}/${id}`)
  return response.data
}

const stockService = {
  getAll,
  getMaterialStock,
  create,
  updateQuantity,
  remove,
}

export default stockService
