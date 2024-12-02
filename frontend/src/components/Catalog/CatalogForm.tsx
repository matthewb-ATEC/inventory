import { useState } from 'react'
import consumablesService from '../../services/consumablesService'
import { ConsumableType } from '../../types'
import Container from '../Container'

const CatalogForm = () => {
  const [category, setCategory] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [sku, setSku] = useState<string>('')
  const [totalStock, setTotalStock] = useState<string>('')
  const [shelfStock, setShelfStock] = useState<string>('')
  const [overStock, setOverStock] = useState<string>('')
  const [shelfStockLocation, setShelfStockLocation] = useState<string>('')
  const [overStockLocation, setOverStockLocation] = useState<string>('')

  const addToCatalog = async () => {
    const consumable: ConsumableType = {
      id: '',
      name: name,
      sku: sku,
      totalStock: totalStock ? Number(totalStock) : 0,
      availableStock: totalStock ? Number(totalStock) : 0,
      shelfStock: shelfStock ? Number(shelfStock) : 0,
      overStock: overStock ? Number(overStock) : 0,
      shelfStockLocation: shelfStockLocation,
      overStockLocation: overStockLocation,
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
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="text-sm">ITEM DETAILS</div>
            <div className="grid grid-cols-[1fr_2fr] items-center gap-y-2 gap-x-4">
              <label className="text-gray-500 text-nowrap">Category</label>
              <select
                id="category"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value)
                }}
                className={`border-b-2 border-gray-300 p-2 ${
                  category ? 'text-black' : 'text-gray-400'
                }`}
              >
                <option value="">Select a category</option>
                <option value="consumable">Consumable</option>
                <option value="material">Material</option>
              </select>

              <label className="text-gray-500 text-nowrap">SKU Number</label>
              <input
                className="border-b-2 border-gray-300 p-2"
                type="text"
                placeholder="Identifier"
                value={sku}
                onChange={(event) => {
                  setSku(event.target.value)
                }}
              />

              <label className="text-gray-500 text-nowrap">Item Name</label>
              <input
                className="border-b-2 border-gray-300 p-2"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                }}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="text-sm">INITIAL STOCK</div>
            <div className="grid grid-cols-[1fr_2fr] items-center gap-y-2 gap-x-4">
              <label className="text-gray-500 text-nowrap">Total</label>
              <input
                className="border-b-2 border-gray-300 p-2"
                type="number"
                placeholder="Quantity"
                value={totalStock}
                onChange={(event) => {
                  setTotalStock(event.target.value)
                }}
              />

              <label className="text-gray-500 text-nowrap">Shelf</label>
              <input
                className="border-b-2 border-gray-300 p-2"
                type="number"
                placeholder="Quantity"
                value={shelfStock}
                onChange={(event) => {
                  setShelfStock(event.target.value)
                }}
              />

              <label className="text-gray-500 text-nowrap">Overstock</label>
              <input
                className="border-b-2 border-gray-300 p-2"
                type="number"
                placeholder="Quantity"
                value={overStock}
                onChange={(event) => {
                  setOverStock(event.target.value)
                }}
              />
            </div>
          </div>

          <div
            className={`flex flex-col space-y-2 ${
              shelfStock || overStock
                ? 'transition-all duration-500 ease-in-out opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="text-sm">STOCK LOCATION</div>
            <div className="grid grid-cols-[1fr_2fr] items-center gap-y-2 gap-x-4">
              {shelfStock ? (
                <>
                  <label className="text-gray-500 text-nowrap">Shelf</label>
                  <input
                    className="border-b-2 border-gray-300 p-2"
                    type="number"
                    placeholder="Location"
                    value={shelfStockLocation}
                    onChange={(event) => {
                      setShelfStockLocation(event.target.value)
                    }}
                  />
                </>
              ) : null}

              {overStock ? (
                <>
                  <label className="text-gray-500 text-nowrap">Overstock</label>
                  <input
                    className="border-b-2 border-gray-300 p-2"
                    type="number"
                    placeholder="Location"
                    value={overStockLocation}
                    onChange={(event) => {
                      setOverStockLocation(event.target.value)
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>

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
