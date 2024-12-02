import { useEffect, useState } from 'react'
import consumablesService from '../services/consumablesService'
import { ConsumableType } from '../types'
import Body from './Body'
import Container from './Container'
import Loading from './Loading'

const Stock = () => {
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
      <Container>
        <label className="text-xl font-semibold" htmlFor="Stock">
          Consumables
        </label>

        <table className="bg-gray-50">
          <thead>
            <tr>
              <td>Name</td>
              <td>Quantity</td>
            </tr>
          </thead>
          <tbody>
            {consumables.map((consumable) => (
              <tr key={consumable.id} className="text-gray-500">
                <td>{consumable.name}</td>
                <td>{consumable.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </Body>
  )
}

export default Stock
