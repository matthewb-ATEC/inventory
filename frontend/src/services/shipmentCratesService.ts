import axios from 'axios'
import {
  CreateShipmentCrateType,
  ShipmentCrateType,
} from '../types/shipmentCrate'

const baseURL = '/api/shipmentCrates'

const getAll = async (): Promise<ShipmentCrateType[]> => {
  const response = await axios.get<ShipmentCrateType[]>(baseURL)
  return response.data
}

const create = async (
  shipmentCrates: CreateShipmentCrateType
): Promise<ShipmentCrateType> => {
  const response = await axios.post<ShipmentCrateType>(baseURL, shipmentCrates)
  return response.data
}

const update = async (
  id: number,
  shipmentCrates: ShipmentCrateType
): Promise<ShipmentCrateType> => {
  const response = await axios.put<ShipmentCrateType>(
    `${baseURL}/${id}/`,
    shipmentCrates
  )
  return response.data
}

const remove = async (id: number): Promise<ShipmentCrateType> => {
  const response = await axios.delete<ShipmentCrateType>(`${baseURL}/${id}`)
  return response.data
}

const removeAll = async (): Promise<ShipmentCrateType> => {
  const response = await axios.delete<ShipmentCrateType>(baseURL)
  return response.data
}

const shipmentCratesService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
}

export default shipmentCratesService
