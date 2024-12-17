import axios from 'axios'
import { CreateVendorType, VendorType } from '../types/vendor'

const baseURL = '/api/vendors'

const getAll = async (): Promise<VendorType[]> => {
  const response = await axios.get<VendorType[]>(baseURL)
  return response.data
}

const create = async (stock: CreateVendorType): Promise<VendorType> => {
  const response = await axios.post<VendorType>(baseURL, stock)
  return response.data
}

const update = async (
  id: number,
  newVendor: VendorType
): Promise<VendorType> => {
  const response = await axios.put<VendorType>(`${baseURL}/${id}`, newVendor)
  return response.data
}

const remove = async (id: number): Promise<VendorType> => {
  const response = await axios.delete<VendorType>(`${baseURL}/${id}`)
  return response.data
}

const removeAll = async (): Promise<VendorType> => {
  const response = await axios.delete<VendorType>(baseURL)
  return response.data
}

const vendorsService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
}

export default vendorsService
