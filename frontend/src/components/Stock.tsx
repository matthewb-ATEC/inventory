import { useEffect, useState } from 'react'
import consumablesService from '../services/consumablesService'
import { ConsumableType } from '../types'

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

  if (!consumables.length) return <>loading...</>

  console.log(consumables)

  return (
    <div className="bg-gray-50 flex flex-grow items-center justify-center">
      <div className="flex flex-col space-y-4 bg-white p-8 rounded-md shadow-md m-6 md:m-16">
        <div className="flex flex-col space-y-2">
          <label className="text-xl font-semibold" htmlFor="Stock">
            Stock
          </label>
          <div className="text-gray-500">
            View to quantity, location and other deatils about the warehouse
            stock
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xl font-semibold" htmlFor="Stock">
            Consumbales
          </label>
          <div>
            {consumables.map((consumable, index) => (
              <div key={index}>{consumable.name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stock
