import axios from 'axios'
import { CreateStockType, StockType } from '../types/stock'
import { MaterialType } from '../types/material'

const baseURL = '/api/stock'

const getAll = async (): Promise<StockType[]> => {
  const response = await axios.get<StockType[]>(baseURL)
  return response.data
}

const getMaterialStock = async (
  material: MaterialType,
  projectNumber?: number
): Promise<StockType> => {
  const requestURL = `${baseURL}/material/${material.partNumber}`
  const params = projectNumber ? { projectNumber } : undefined

  const response = await axios.get<StockType>(requestURL, { params })
  return response.data
}

const create = async (stock: CreateStockType): Promise<StockType> => {
  const response = await axios.post<StockType>(baseURL, stock)
  return response.data
}

const update = async (id: number, newStock: StockType): Promise<StockType> => {
  const response = await axios.put<StockType>(`${baseURL}/${id}`, newStock)
  return response.data
}

const remove = async (id: number): Promise<StockType> => {
  const response = await axios.delete<StockType>(`${baseURL}/${id}`)
  return response.data
}

const removeAll = async (): Promise<StockType> => {
  const response = await axios.delete<StockType>(baseURL)
  return response.data
}

const stockService = {
  getAll,
  getMaterialStock,
  create,
  update,
  remove,
  removeAll,
}

export default stockService
