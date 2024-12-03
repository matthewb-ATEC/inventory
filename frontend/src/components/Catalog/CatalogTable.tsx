import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'
import { ConsumableType } from '../../types'
import { useEffect, useState } from 'react'
import consumablesService from '../../services/consumablesService'
import Container from '../Container'
import { Subtitle, Title } from '../Text'

const columnHelper = createColumnHelper<ConsumableType>()

const consumablesColumns = [
  columnHelper.accessor('sku', {
    header: () => 'SKU',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
  }),
]

const CatalogTable = () => {
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

  return (
    <Container>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <Title text="Catalog" />
          <Subtitle text="Each unique item tracked in inventory" />
        </div>
        <Table data={consumables} columns={consumablesColumns} />
      </div>
    </Container>
  )
}

export default CatalogTable
