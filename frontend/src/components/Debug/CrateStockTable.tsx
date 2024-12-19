// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import crateStockService from '../../services/crateStockService'
import { CreateCrateStockType, CrateStockType } from '../../types/crateStock'
import Button from '../Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<CrateStockType>()

const columns = [
  {
    header: 'Crate Stock',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'Id',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: 'Crate',
    columns: [
      columnHelper.accessor('crate.id', {
        header: () => 'Crate Id',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('crate.number', {
        header: () => 'Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('crate.location.aisle', {
        header: () => 'Aisle',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('crate.location.col', {
        header: () => 'Column',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('crate.location.shelf', {
        header: () => 'Shelf',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: 'Stock',
    columns: [
      columnHelper.accessor('stock.id', {
        header: () => 'Stock Id',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('stock.material.partNumber', {
        header: () => 'Part Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('stock.material.description', {
        header: () => 'Description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('stock.material.color', {
        header: () => 'Color',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('stock.material.vendor.name', {
        header: () => 'Vendor',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('stock.material.tag', {
        header: () => 'Tag',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('stock.material.thicknessInches', {
        header: () => 'Thickness',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('stock.material.widthInches', {
        header: () => 'Width',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('stock.material.lengthInches', {
        header: () => 'Length',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('stock.material.squareFeet', {
        header: () => 'Square Feet',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('stock.quantity', {
        header: () => 'Quantity',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const CrateStockTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: crateStock = [],
    isLoading,
    isError,
  } = useQuery<CrateStockType[]>({
    queryKey: ['crateStock'],
    queryFn: crateStockService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createCrateMutation = useMutation({
    mutationFn: (newCrate: CreateCrateStockType) =>
      crateStockService.create(newCrate),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['crateStock'] })
      console.log('Crate created:', data)
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Error',
          message: 'Failed to create new crate stock',
          status: 'error',
        })
      )
      console.error('Error creating crate stock:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => crateStockService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crateStock'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('crate stock deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all crate stock from the database',
          status: 'error',
        })
      )
      console.error('Error deleting crate stock:', error)
    },
  })

  const createCrate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const crateId = parseInt(
      (form.elements.namedItem('crateId') as HTMLInputElement).value,
      10
    )

    const stockId = parseInt(
      (form.elements.namedItem('stockId') as HTMLInputElement).value,
      10
    )

    const newCrate: CreateCrateStockType = {
      crateId,
      stockId,
    }

    createCrateMutation.mutate(newCrate)
  }

  const deleteAllCrateStock = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching crate stock data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={crateStock} columns={columns} search={false} />

      <form onSubmit={createCrate} className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="crate ID"
            name="crateId"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="stock ID"
            name="stockId"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button type="submit" text="Create crate stock" onClick={() => {}} />
          <Button text="Delete all crate stock" onClick={deleteAllCrateStock} />
        </div>
      </form>
    </div>
  )
}

export default CrateStockTable
