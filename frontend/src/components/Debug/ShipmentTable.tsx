// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import shipmentsService from '../../services/shipmentsService'
import {
  CreateShipmentType,
  ShipmentStatusEnum,
  ShipmentType,
  ShipmentTypeEnum,
} from '../../types/shipment'
import Button from '../Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<ShipmentType>()

const columns = [
  {
    header: 'Shipments',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'Id',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('type', {
        header: () => 'Type',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: () => 'Status',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: 'Project',
    columns: [
      columnHelper.accessor('project.id', {
        header: () => 'Project ID',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('project.number', {
        header: () => 'Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('project.name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: 'Vendor',
    columns: [
      columnHelper.accessor('vendor.id', {
        header: () => 'Vendor ID',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('vendor.name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const ShipmentTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: shipments = [],
    isLoading,
    isError,
  } = useQuery<ShipmentType[]>({
    queryKey: ['shipments'],
    queryFn: shipmentsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createShipmentMutation = useMutation({
    mutationFn: (newShipment: CreateShipmentType) =>
      shipmentsService.create(newShipment),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      console.log('Shipment created:', data)
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
          message: 'Failed to create new shipment',
          status: 'error',
        })
      )
      console.error('Error creating shipment:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => shipmentsService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('Shipments deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all shipments from the database',
          status: 'error',
        })
      )
      console.error('Error deleting shipments:', error)
    },
  })

  const createShipment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const type = (form.elements.namedItem('type') as HTMLInputElement).value

    const status = (form.elements.namedItem('status') as HTMLInputElement).value

    const projectId = parseInt(
      (form.elements.namedItem('projectId') as HTMLInputElement).value,
      10
    )

    const vendorId = parseInt(
      (form.elements.namedItem('vendorId') as HTMLInputElement).value,
      10
    )

    const newShipment: CreateShipmentType = {
      type: type as ShipmentTypeEnum,
      status: status as ShipmentStatusEnum,
      projectId,
      vendorId,
    }

    createShipmentMutation.mutate(newShipment)
  }

  const deleteAllShipments = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching shipment data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={shipments} columns={columns} search={false} />

      <form onSubmit={createShipment} className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <select
            className="p-2 border-b-2 border-gray-300"
            name="type"
            defaultValue=""
          >
            <option value="" disabled>
              Select Type
            </option>
            {Object.values(ShipmentTypeEnum).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            className="p-2 border-b-2 border-gray-300"
            name="status"
            defaultValue=""
          >
            <option value="" disabled>
              Select Status
            </option>
            {Object.values(ShipmentStatusEnum).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="project ID"
            name="projectId"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="vendor ID"
            name="vendorId"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button type="submit" text="Create shipment" onClick={() => {}} />
          <Button text="Delete all shipments" onClick={deleteAllShipments} />
        </div>
      </form>
    </div>
  )
}

export default ShipmentTable
