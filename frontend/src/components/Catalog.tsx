import { useEffect, useState } from 'react'
import consumablesService from '../services/consumablesService'
import { ConsumableType } from '../types'
import Container from './Container'
import Body from './Body'
import CatalogForm from './CatalogForm'
import Loading from './Loading'

const Catalog = () => {
  const [consumables, setConsumables] = useState<ConsumableType[]>([])

  useEffect(() => {
    const getConsumables = async (): Promise<void> => {
      try {
        const response = await consumablesService.getAll()
        setConsumables(response)
      } catch (error) {
        console.error('Failed to fetch consumables:', error)
      }
    }
    void getConsumables()
  }, [])

  if (!consumables.length) return <Loading />

  return (
    <Body>
      <div className="flex flex-col space-y-8">
        <Container>
          <div className="flex flex-col space-y-2">
            <label className="text-xl font-semibold" htmlFor="Catalog">
              Consumables
            </label>

            <table className="bg-gray-50">
              <thead>
                <tr>
                  <td>Name</td>
                </tr>
              </thead>
              <tbody className="p-6">
                {consumables.map((consumable) => (
                  <tr key={consumable.id} className="text-gray-500">
                    <td>{consumable.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>

        <CatalogForm />
      </div>
    </Body>
  )
}

export default Catalog
