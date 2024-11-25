import axios from 'axios'
import { CompanyType } from '../../types'

const baseURL = '/api/procore/companies'

const getAll = async (): Promise<CompanyType[]> => {
  const response = await axios.get<CompanyType[]>(baseURL)
  return response.data
}

const getId = async (id: string): Promise<CompanyType> => {
  const response = await axios.get<CompanyType>(`${baseURL}/${id}`)
  return response.data
}

const create = async (company: CompanyType): Promise<CompanyType> => {
  const response = await axios.post<CompanyType>(baseURL, company)
  return response.data
}

const update = async (
  id: string,
  company: CompanyType
): Promise<CompanyType> => {
  const response = await axios.put<CompanyType>(`${baseURL}/${id}`, company)
  return response.data
}

const remove = async (id: string): Promise<CompanyType> => {
  const response = await axios.delete<CompanyType>(`${baseURL}/${id}`)
  return response.data
}

const companiesService = { getAll, getId, create, update, remove }

export default companiesService
