import { useEffect, useState } from 'react'
import consumablesService from '../../services/consumablesService'
import { ConsumableType } from '../../types'
import Container from '../Container'
import Body from '../Body'
import CatalogForm from './CatalogForm'
import Loading from '../Loading'
import CatalogTable from './CatalogTable'
import { Subtitle, Title } from '../Text'

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
        <CatalogForm />
        <Container>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-2">
              <Title text="Catalog" />
              <Subtitle text="Each unique item tracked in inventory" />
            </div>
            <CatalogTable />
          </div>
        </Container>
      </div>
    </Body>
  )
}

export default Catalog
