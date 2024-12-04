import { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'
import stockService from '../../services/stockService'
import { StockType } from '../../types'

const columnHelper = createColumnHelper<StockType>()

const columns = [
  {
    header: 'Item',
    columns: [
      columnHelper.accessor('item.sku', {
        header: () => 'SKU',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('item.name', {
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
  /*
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
  */
]

const StockTable = () => {
  const [stock, setStock] = useState<StockType[]>([])

  useEffect(() => {
    const getStock = async (): Promise<void> => {
      try {
        const response = await stockService.getAll()
        setStock(response)
      } catch (error) {
        console.error('Failed to fetch stock:', error)
      }
    }
    void getStock()
  }, [])

  return (
    <div>
      <Table data={stock} columns={columns} />
    </div>
  )
}

export default StockTable
