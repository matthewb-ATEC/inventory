import { createColumnHelper } from '@tanstack/react-table'
import { StockType } from '../../types'
import Table from '../Table'
import stockService from '../../services/stockService'
import { useEffect, useState } from 'react'

/*
const calculateSqft = (size: string, quantity: number): number => {
  const [width, height] = size.split(' x ').map((dim) => parseFloat(dim))
  const sqftPerItem = (width * height) / 144 // Convert square inches to square feet
  const sqft = sqftPerItem * quantity
  const roundedSqft = Number(sqft.toFixed(1))
  return roundedSqft
}
*/

const columnHelper = createColumnHelper<StockType>()

const columns = [
  {
    header: 'Material',
    columns: [
      /*columnHelper.accessor('material.partNumber', {
        header: () => 'Part Number',
        cell: (info) => info.getValue(),
      }),*/
      columnHelper.accessor('material.partDescription', {
        header: () => 'Description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.size', {
        header: () => 'Size',
        cell: (info) => info.getValue(),
      }),
      /*columnHelper.accessor('material.color', {
        header: () => 'Color',
        cell: (info) => info.getValue(),
      }),*/
      columnHelper.accessor('material.vendor', {
        header: () => 'Vendor',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.tag', {
        header: () => 'Tag',
        cell: (info) => info.getValue(),
      }),
    ],
  },

  {
    header: 'Project',
    columns: [
      columnHelper.accessor('project.number', {
        header: () => 'Number',
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('project.name', {
        header: () => 'Name',
        cell: (info) => info.renderValue(),
      }),
    ],
  },
  {
    header: 'Stock',
    columns: [
      columnHelper.accessor('quantity', {
        header: () => 'Quantity',
        cell: (info) => info.renderValue(),
      }),
      /*columnHelper.accessor('sqft', {
        header: () => 'Sqft',
        cell: (info) => {
          // Use calculateSqft to compute the sqft
          const { size } = info.row.original.material
          const { quantity } = info.row.original
          return calculateSqft(size, quantity)
        },
      }),*/
    ],
  },
]

const InventoryTable = () => {
  const [stock, setStock] = useState<StockType[]>([])

  const getStock = async () => {
    const stock = await stockService.getAll()
    setStock(stock)
  }

  useEffect(() => {
    void getStock()
  }, [])

  return (
    <div>
      <Table data={stock} columns={columns} />
    </div>
  )
}

export default InventoryTable
