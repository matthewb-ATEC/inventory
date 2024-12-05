import { createColumnHelper } from '@tanstack/react-table'
import { InventoryType } from '../../types'
import { inventory } from '../../data'
import Table from '../Table'

const calculateSqft = (size: string, quantity: number): number => {
  const [width, height] = size.split(' x ').map((dim) => parseFloat(dim))
  const sqftPerItem = (width * height) / 144 // Convert square inches to square feet
  const sqft = sqftPerItem * quantity
  const roundedSqft = Number(sqft.toFixed(1))
  return roundedSqft
}

const columnHelper = createColumnHelper<InventoryType>()

const columns = [
  {
    header: 'Material',
    columns: [
      columnHelper.accessor('material.name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.vendor', {
        header: () => 'Vendor',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.size', {
        header: () => 'Size',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.tag', {
        header: () => 'Tag',
        cell: (info) => info.getValue(),
      }),
    ],
  },

  {
    header: 'Stock',
    columns: [
      columnHelper.accessor('project.number', {
        header: () => 'Project',
        cell: (info) => {
          // Use calculateSqft to compute the sqft
          const { number, name } = info.row.original.project
          const projectDisplay = `${number} ${name}`
          return projectDisplay
        },
      }),
      columnHelper.accessor('quantity', {
        header: () => 'Quantity',
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('sqft', {
        header: () => 'Sqft',
        cell: (info) => {
          // Use calculateSqft to compute the sqft
          const { size } = info.row.original.material
          const { quantity } = info.row.original
          return calculateSqft(size, quantity)
        },
      }),
    ],
  },
]

const InventoryTable = () => {
  return (
    <div>
      <Table data={inventory} columns={columns} />
    </div>
  )
}

export default InventoryTable
