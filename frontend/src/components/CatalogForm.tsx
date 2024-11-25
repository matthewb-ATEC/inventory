import { useState } from 'react'
import consumablesService from '../services/consumablesService'
import { ConsumableType } from '../types'
import Container from './Container'

const CatalogForm = () => {
  const [name, setName] = useState<string>('')

  const addToCatalog = async () => {
    const consumable: ConsumableType = {
      id: '',
      name: name,
      quantity: 0,
    }
    await consumablesService.create(consumable)
  }

  const handleSubmit = () => {
    void addToCatalog()
  }

  return (
    <Container>
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-semibold" htmlFor="Catalog">
          Add to Catalog
        </label>
        <div className="text-gray-500">
          Insert a new item type into the catalog
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <select className="border-b-2 border-gray-300 p-2">
            <option>Consumable</option>
            <option>Material</option>
          </select>

          <input
            className="border-b-2 border-gray-300 p-2"
            type="text"
            placeholder="Item name"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
          />

          <button
            type="submit"
            className="p-2 px-4 rounded-md bg-ATECblue text-white"
          >
            Add
          </button>
        </div>
      </form>
    </Container>
  )
}

export default CatalogForm
