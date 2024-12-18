import axios from 'axios'
import { CreateLocationType, LocationType } from '../types/location'

const baseURL = '/api/locations'

const getAll = async (): Promise<LocationType[]> => {
  const response = await axios.get<LocationType[]>(baseURL)
  return response.data
}

const create = async (location: CreateLocationType): Promise<LocationType> => {
  const response = await axios.post<LocationType>(baseURL, location)
  return response.data
}

const update = async (
  id: number,
  location: LocationType
): Promise<LocationType> => {
  const response = await axios.put<LocationType>(`${baseURL}/${id}/`, location)
  return response.data
}

const remove = async (id: number): Promise<LocationType> => {
  const response = await axios.delete<LocationType>(`${baseURL}/${id}`)
  return response.data
}

const removeAll = async (): Promise<LocationType> => {
  const response = await axios.delete<LocationType>(baseURL)
  return response.data
}

const locationsService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
}

export default locationsService
