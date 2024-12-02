import { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { ConsumableType } from '../../types'
import consumablesService from '../../services/consumablesService'
import Table from '../Table'

const columnHelper = createColumnHelper<ConsumableType>()

const columns = [
  {
    header: 'Item',
    columns: [
      columnHelper.accessor('sku', {
        header: () => 'SKU',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),
    ],
  },

  {
    header: 'Stock',
    columns: [
      columnHelper.accessor('totalStock', {
        header: () => 'Total',
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('availableStock', {
        header: () => 'Available',
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('shelfStock', {
        header: () => 'On Shelf',
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('overStock', {
        header: () => 'Overstock',
        cell: (info) => info.renderValue(),
      }),
    ],
  },

  {
    header: 'Location',
    columns: [
      columnHelper.accessor('shelfStockLocation', {
        header: () => 'Shelf',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('overStockLocation', {
        header: () => 'Overstock',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const ConsumablesTable = () => {
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
      <Table data={consumables} columns={columns} />
    </div>
  )
}

export default ConsumablesTable
