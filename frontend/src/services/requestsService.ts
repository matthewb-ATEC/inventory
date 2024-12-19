import axios from 'axios'
import { CreateRequestType, RequestType } from '../types/request'

const baseURL = '/api/requests'

const getAll = async (): Promise<RequestType[]> => {
  const response = await axios.get<RequestType[]>(baseURL)
  return response.data
}

const create = async (request: CreateRequestType): Promise<RequestType> => {
  const response = await axios.post<RequestType>(baseURL, request)
  return response.data
}

const update = async (
  id: number,
  request: RequestType
): Promise<RequestType> => {
  const response = await axios.put<RequestType>(`${baseURL}/${id}/`, request)
  return response.data
}

const remove = async (id: number): Promise<RequestType> => {
  const response = await axios.delete<RequestType>(`${baseURL}/${id}`)
  return response.data
}

const removeAll = async (): Promise<RequestType> => {
  const response = await axios.delete<RequestType>(baseURL)
  return response.data
}

const cratesService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
}

export default cratesService
