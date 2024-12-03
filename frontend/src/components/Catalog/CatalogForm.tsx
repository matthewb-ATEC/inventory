import { useState } from 'react'
import consumablesService from '../../services/consumablesService'
import { ConsumableType } from '../../types'
import Container from '../Container'
import Button from '../Button'
import { Header, Subtitle, Text, Title } from '../Text'

const types = ['Consumables', 'Materials']

const categories = [
  'Asset',
  'Ceiling',
  'Consumable',
  'Door Hardware',
  'Electrical',
  'Equipment',
  'Hardware',
  'HVAC',
  'Interstitial',
  'Protocol',
  'Safety',
  'Strut',
  'Tool',
  'Wall',
]

const units = ['Each', 'Linear ft', 'Pair', 'Square ft']

const requiredFields = ['type', 'category', 'sku', 'name', 'unitOfMeasure']

const CatalogForm = () => {
  const [type, setType] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [sku, setSku] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [unitOfMeasure, setUnitOfMeasure] = useState<string>('')
  const [totalStock, setTotalStock] = useState<string>('')
  const [shelfStock, setShelfStock] = useState<string>('')
  const [overStock, setOverStock] = useState<string>('')
  const [shelfStockLocation, setShelfStockLocation] = useState<string>('')
  const [overStockLocation, setOverStockLocation] = useState<string>('')

  const isFormValid = () => {
    return requiredFields.every((field) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const value = eval(field)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value && value.trim() !== ''
    })
  }

  const addToCatalog = async () => {
    const consumable: ConsumableType = {
      id: '',
      type: type,
      category: category,
      sku: sku,
      name: name,
      unitOfMeasure: unitOfMeasure,
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
        <Title text="Add to Catalog" />
        <Subtitle text="Insert a new item type into the catalog" />
      </div>

      <form>
        <div className="flex flex-col space-y-8 mt-4">
          <div className="flex flex-col space-y-2">
            <Header text="Item Details" />
            <div className="grid grid-cols-[1fr_2fr] items-center gap-y-2 gap-x-4">
              {/* Item type */}
              <Text className="md:text-nowrap" text="Type" />
              <select
                id="type"
                value={type}
                onChange={(event) => {
                  setType(event.target.value)
                }}
                className={`border-b-2 border-gray-300 p-2 pl-1 ${
                  category ? 'text-black' : 'text-gray-400'
                }`}
              >
                <option value="">Select a type</option>
                {types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* Item Category */}
              {type && <Text className="md:text-nowrap" text="Category" />}
              {type && (
                <select
                  id="category"
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value)
                  }}
                  className={`border-b-2 border-gray-300 p-2 pl-1 ${
                    category ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}

              {/* Item SKU Number */}
              {type && category && (
                <Text className="md:text-nowrap" text="SKU Number" />
              )}
              {type && category && (
                <input
                  className="border-b-2 border-gray-300 p-2"
                  type="text"
                  placeholder="Identifier"
                  value={sku}
                  onChange={(event) => {
                    setSku(event.target.value)
                  }}
                />
              )}

              {/* Item Name */}
              {type && category && sku && (
                <Text className="md:text-nowrap" text="Item Name" />
              )}
              {type && category && sku && (
                <input
                  className="border-b-2 border-gray-300 p-2"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value)
                  }}
                />
              )}

              {/* Unit of Measure */}
              {type && category && sku && name && (
                <Text className="md:text-nowrap" text="Unit of Measure" />
              )}
              {type && category && sku && name && (
                <select
                  id="unitOfMeasure"
                  value={unitOfMeasure}
                  onChange={(event) => {
                    setUnitOfMeasure(event.target.value)
                  }}
                  className={`border-b-2 border-gray-300 p-2 pl-1 ${
                    unitOfMeasure ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  <option value="">Select a unit</option>
                  {units.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Initial Stock */}
          {type && category && sku && name && unitOfMeasure && (
            <div className="flex flex-col space-y-2">
              <Header text="Initial Stock" />
              <div className="grid grid-cols-[1fr_2fr] items-center gap-y-2 gap-x-4">
                {/* Total quantity */}
                <Text className="md:text-nowrap" text="Total" />
                <input
                  className="border-b-2 border-gray-300 p-2"
                  type="number"
                  placeholder="Quantity"
                  value={totalStock}
                  min={0}
                  onChange={(event) => {
                    setTotalStock(event.target.value)
                  }}
                />

                {/* Shelf stock quantity */}
                {totalStock && (
                  <Text className="text-gray-500 text-nowrap" text="Shelf" />
                )}
                {totalStock && (
                  <input
                    className="border-b-2 border-gray-300 p-2"
                    type="number"
                    placeholder="Quantity"
                    value={shelfStock}
                    min={0}
                    max={totalStock}
                    onChange={(event) => {
                      setShelfStock(event.target.value)
                    }}
                  />
                )}

                {/* Overtstock quantity */}
                {totalStock && (
                  <Text
                    className="text-gray-500 text-nowrap"
                    text="Overstock"
                  />
                )}
                {totalStock && (
                  <input
                    className="border-b-2 border-gray-300 p-2"
                    type="number"
                    placeholder="Quantity"
                    value={overStock}
                    min={0}
                    max={totalStock}
                    onChange={(event) => {
                      setOverStock(event.target.value)
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Stock Locations */}
          {(shelfStock || overStock) && (
            <div className="flex flex-col space-y-2">
              <Header text="Stock Location" />
              <div className="grid grid-cols-[1fr_2fr] items-center gap-y-2 gap-x-4">
                {/* Shelf location */}
                {shelfStock && (
                  <>
                    <label className="text-gray-500 text-nowrap">Shelf</label>
                    <input
                      className="border-b-2 border-gray-300 p-2"
                      type="text"
                      placeholder="Location"
                      value={shelfStockLocation}
                      onChange={(event) => {
                        setShelfStockLocation(event.target.value)
                      }}
                    />
                  </>
                )}

                {/* Overtstock location */}
                {overStock ? (
                  <>
                    <label className="text-gray-500 text-nowrap">
                      Overstock
                    </label>
                    <input
                      className="border-b-2 border-gray-300 p-2"
                      type="text"
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
          )}

          <Button text="Add" onClick={handleSubmit} disabled={!isFormValid()} />
        </div>
      </form>
    </Container>
  )
}

export default CatalogForm
