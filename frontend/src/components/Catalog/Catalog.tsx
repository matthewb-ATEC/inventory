import { useEffect, useState } from 'react'
import consumablesService from '../../services/consumablesService'
import { ConsumableType } from '../../types'
import Container from '../Container'
import Body from '../Body'
import CatalogForm from './CatalogForm'
import Loading from '../Loading'
import CatalogTable from './CatalogTable'

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
      <div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-[1fr_3fr] md:gap-x-8 lg:grid-cols-[1fr_2fr]">
        <CatalogForm />
        <Container>
          <div className="flex flex-col space-y-2">
            <label className="text-xl font-semibold" htmlFor="Catalog">
              Consumables
            </label>

            <CatalogTable />
          </div>
        </Container>
      </div>
    </Body>
  )
}

export default Catalog
