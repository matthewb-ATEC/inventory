import axios from 'axios'
import { CreateShipmentType, ShipmentType } from '../types/shipment'

const baseURL = '/api/shipments'

const getAll = async (): Promise<ShipmentType[]> => {
  const response = await axios.get<ShipmentType[]>(baseURL)
  return response.data
}

const create = async (shipment: CreateShipmentType): Promise<ShipmentType> => {
  const response = await axios.post<ShipmentType>(baseURL, shipment)
  return response.data
}

const update = async (
  id: number,
  shipment: ShipmentType
): Promise<ShipmentType> => {
  const response = await axios.put<ShipmentType>(`${baseURL}/${id}/`, shipment)
  return response.data
}

const remove = async (id: number): Promise<ShipmentType> => {
  const response = await axios.delete<ShipmentType>(`${baseURL}/${id}`)
  return response.data
}

const removeAll = async (): Promise<ShipmentType> => {
  const response = await axios.delete<ShipmentType>(baseURL)
  return response.data
}

const shipmentsService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
}

export default shipmentsService
