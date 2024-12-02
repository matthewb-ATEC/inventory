import axios from 'axios'
import { DeliveryType } from '../../types'

const baseURL = '/api/procore/deliveries'

const getAll = async (): Promise<DeliveryType[]> => {
  const response = await axios.get<DeliveryType[]>(baseURL)
  return response.data
}

const getId = async (id: string): Promise<DeliveryType> => {
  const response = await axios.get<DeliveryType>(`${baseURL}/${id}`)
  return response.data
}

const create = async (delivery: DeliveryType): Promise<DeliveryType> => {
  const response = await axios.post<DeliveryType>(baseURL, delivery)
  return response.data
}

const update = async (
  id: string,
  delivery: DeliveryType
): Promise<DeliveryType> => {
  const response = await axios.put<DeliveryType>(`${baseURL}/${id}`, delivery)
  return response.data
}

const remove = async (id: string): Promise<DeliveryType> => {
  const response = await axios.delete<DeliveryType>(`${baseURL}/${id}`)
  return response.data
}

const deliveriesService = { getAll, getId, create, update, remove }

export default deliveriesService
