// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import stockService from '../../services/stockService'
import { CreateStockType, StockType } from '../../types/stock'
import Button from '../Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<StockType>()

const columns = [
  {
    header: 'Stock',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'Id',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.partNumber', {
        header: () => 'Part Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.description', {
        header: () => 'Description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.color', {
        header: () => 'Color',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.vendor.name', {
        header: () => 'Vendor',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.tag', {
        header: () => 'Tag',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.thicknessInches', {
        header: () => 'Thickness',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.widthInches', {
        header: () => 'Width',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.lengthInches', {
        header: () => 'Length',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.squareFeet', {
        header: () => 'Square Feet',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('quantity', {
        header: () => 'Quantity',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const StockTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: stock = [],
    isLoading,
    isError,
  } = useQuery<StockType[]>({
    queryKey: ['stock'],
    queryFn: stockService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createStockMutation = useMutation({
    mutationFn: (newStock: CreateStockType) => stockService.create(newStock),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['stock'] })
      console.log('Stock created:', data)
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
          message: 'Failed to create new stock',
          status: 'error',
        })
      )
      console.error('Error creating stock:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => stockService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('Stock deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all stock from the database',
          status: 'error',
        })
      )
      console.error('Error deleting stock:', error)
    },
  })

  const createStock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const materialId = parseInt(
      (form.elements.namedItem('materialId') as HTMLInputElement).value,
      10
    )
    const quantity = parseInt(
      (form.elements.namedItem('quantity') as HTMLInputElement).value,
      10
    )

    const newStock: CreateStockType = {
      materialId,
      quantity,
    }

    createStockMutation.mutate(newStock)
  }

  const deleteAllStock = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching stock data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={stock} columns={columns} search={false} />

      <form onSubmit={createStock} className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="material ID"
            name="materialId"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="quantity"
            name="quantity"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button type="submit" text="Create stock" onClick={() => {}} />
          <Button text="Delete all stock" onClick={deleteAllStock} />
        </div>
      </form>
    </div>
  )
}

export default StockTable
