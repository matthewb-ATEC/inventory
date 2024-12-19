// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import requestStockService from '../../services/requestStockService'
import {
  CreateRequestStockType,
  RequestStockType,
} from '../../types/requestStock'
import Button from '../Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<RequestStockType>()

const columns = [
  {
    header: 'Request Stock',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'Id',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: 'Request',
    columns: [
      columnHelper.accessor('request.id', {
        header: () => 'Request Id',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('request.project.number', {
        header: () => 'Project Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('request.project.name', {
        header: () => 'Project Name',
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

const RequestStockTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: RequestStock = [],
    isLoading,
    isError,
  } = useQuery<RequestStockType[]>({
    queryKey: ['requestStock'],
    queryFn: requestStockService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createRequestMutation = useMutation({
    mutationFn: (newRequest: CreateRequestStockType) =>
      requestStockService.create(newRequest),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['requestStock'] })
      console.log('Request created:', data)
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
          message: 'Failed to create new request stock',
          status: 'error',
        })
      )
      console.error('Error creating request stock:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => requestStockService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestStock'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('Request stock deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all request stock from the database',
          status: 'error',
        })
      )
      console.error('Error deleting Request stock:', error)
    },
  })

  const createRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const requestId = parseInt(
      (form.elements.namedItem('requestId') as HTMLInputElement).value,
      10
    )

    const stockId = parseInt(
      (form.elements.namedItem('stockId') as HTMLInputElement).value,
      10
    )

    const newRequest: CreateRequestStockType = {
      requestId,
      stockId,
    }

    createRequestMutation.mutate(newRequest)
  }

  const deleteAllRequestStock = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching request stock data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={RequestStock} columns={columns} search={false} />

      <form onSubmit={createRequest} className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="request ID"
            name="requestId"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="stock ID"
            name="stockId"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button
            type="submit"
            text="Create request stock"
            onClick={() => {}}
          />
          <Button
            text="Delete all request stock"
            onClick={deleteAllRequestStock}
          />
        </div>
      </form>
    </div>
  )
}

export default RequestStockTable
