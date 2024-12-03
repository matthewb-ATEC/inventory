import { useEffect, useState } from 'react'
import consumablesService from '../../services/consumablesService'
import { ConsumableType } from '../../types'
import Body from '../Body'
import CatalogForm from './AddToCatalogForm'
import Loading from '../Loading'
import CatalogTable from './CatalogTable'
import RemoveFromCatalogForm from './RemoveFromCatalogForm'
import AddToCatalogForm from './AddToCatalogForm'

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
      <div className="flex flex-col space-y-8 lg:space-y-0 lg:grid lg:gap-x-8 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col space-y-8 flex-grow">
          <AddToCatalogForm />
          <RemoveFromCatalogForm />
        </div>
        <CatalogTable />
      </div>
    </Body>
  )
}

export default Catalog
