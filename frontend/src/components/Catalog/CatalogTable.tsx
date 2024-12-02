import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'
import { ConsumableType } from '../../types'
import { useEffect, useState } from 'react'
import consumablesService from '../../services/consumablesService'

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
    <div>
      <Table data={consumables} columns={consumablesColumns} />
    </div>
  )
}

export default CatalogTable
