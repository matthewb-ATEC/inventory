import axios from 'axios'
import { AuthenticationType } from '../../types'

const baseURL = '/api/procore/authentications'

const getAll = async (): Promise<AuthenticationType[]> => {
  const response = await axios.get<AuthenticationType[]>(baseURL)
  return response.data
}

const getId = async (id: string): Promise<AuthenticationType> => {
  const response = await axios.get<AuthenticationType>(`${baseURL}/${id}`)
  return response.data
}

const create = async (
  authentication: AuthenticationType
): Promise<AuthenticationType> => {
  const response = await axios.post<AuthenticationType>(baseURL, authentication)
  return response.data
}

const update = async (
  id: string,
  authentication: AuthenticationType
): Promise<AuthenticationType> => {
  const response = await axios.put<AuthenticationType>(
    `${baseURL}/${id}`,
    authentication
  )
  return response.data
}

const remove = async (id: string): Promise<AuthenticationType> => {
  const response = await axios.delete<AuthenticationType>(`${baseURL}/${id}`)
  return response.data
}

const authenticationsService = { getAll, getId, create, update, remove }

export default authenticationsService
