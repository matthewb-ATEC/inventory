import { useEffect, useState } from 'react'
import consumablesService from '../../services/consumablesService'
import { ConsumableType } from '../../types'
import Body from '../Body'
import Container from '../Container'
import ConsumablesTable from './ConsumablesTable'

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

  //if (!consumables.length) return <Loading />

  if (!consumables.length)
    return (
      <Body>
        <p>No consumables available.</p>
      </Body>
    )

  return (
    <Body>
      <Container>
        <label className="text-xl font-semibold" htmlFor="Stock">
          Consumables
        </label>
        <ConsumablesTable />
        {/*
        <div className="bg-gray-50 rounded-md py-8">
          <div className="grid grid-cols-[1fr_1fr_4fr_2fr] gap-x-4 px-8">
            <div className="text-lg">SKU</div>
            <div className="text-lg">Name</div>
            <div className="flex flex-col">
              <div className="text-lg">Stock</div>
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-x-4">
                <div className="text-lg text-gray-500">Total</div>
                <div className="text-lg text-gray-500">Available</div>
                <div className="text-lg text-gray-500">Shelf</div>
                <div className="text-lg text-gray-500">Over</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-lg">Location</div>
              <div className="grid grid-cols-[1fr_1fr] gap-x-4">
                <div className="text-lg text-gray-500">Shelf</div>
                <div className="text-lg text-gray-500">Over</div>
              </div>
            </div>
          </div>

          <div>
            {consumables.map((consumable) => (
              <div
                key={consumable.id}
                className="text-gray-500 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-x-4 odd:bg-white px-8"
              >
                <div>{consumable.sku}</div>
                <div>{consumable.name}</div>
                <div>{consumable.totalStock}</div>
                <div>{consumable.availableStock}</div>
                <div>{consumable.shelfStock}</div>
                <div>{consumable.overStock}</div>
                <div>{consumable.shelfStockLocation}</div>
                <div>{consumable.overStockLocation}</div>
              </div>
            ))}
          </div>
        </div>
        */}
      </Container>
    </Body>
  )
}

export default Stock
