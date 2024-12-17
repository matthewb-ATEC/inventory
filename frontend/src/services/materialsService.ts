import axios from 'axios'
import { MaterialType, CreateMaterialType } from '../types/material'

const baseURL = '/api/materials'

const getAll = async (): Promise<MaterialType[]> => {
  const response = await axios.get<MaterialType[]>(baseURL)
  return response.data
}

const getId = async (id: string): Promise<MaterialType> => {
  const response = await axios.get<MaterialType>(`${baseURL}/${id}`)
  return response.data
}

const create = async (material: CreateMaterialType): Promise<MaterialType> => {
  const response = await axios.post<MaterialType>(baseURL, material)
  return response.data
}

const update = async (
  id: string,
  material: MaterialType
): Promise<MaterialType> => {
  const response = await axios.put<MaterialType>(`${baseURL}/${id}`, material)
  return response.data
}

const remove = async (sku: string): Promise<MaterialType> => {
  const response = await axios.delete<MaterialType>(`${baseURL}/${sku}`)
  return response.data
}

const removeAll = async (): Promise<MaterialType> => {
  const response = await axios.delete<MaterialType>(baseURL)
  return response.data
}

const materialsService = { getAll, getId, create, update, remove, removeAll }

export default materialsService
