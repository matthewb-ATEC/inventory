// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import shipmentCratesService from '../../services/shipmentCratesService'
import {
  CreateShipmentCrateType,
  ShipmentCrateType,
} from '../../types/shipmentCrate'
import Button from '../Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<ShipmentCrateType>()

const columns = [
  {
    header: 'Shipment Crate',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'Id',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: 'Shipment',
    columns: [
      columnHelper.accessor('shipment.id', {
        header: () => 'Shipment Id',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('shipment.type', {
        header: () => 'Type',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('shipment.status', {
        header: () => 'Status',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('shipment.project.id', {
        header: () => 'Project ID',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('shipment.project.number', {
        header: () => 'Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('shipment.project.name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('shipment.vendor.id', {
        header: () => 'Vendor ID',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('shipment.vendor.name', {
        header: () => 'Name',
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
]

const ShipmentCrateTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: shipmentCrate = [],
    isLoading,
    isError,
  } = useQuery<ShipmentCrateType[]>({
    queryKey: ['shipmentCrate'],
    queryFn: shipmentCratesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createCrateMutation = useMutation({
    mutationFn: (newShipmentCrate: CreateShipmentCrateType) =>
      shipmentCratesService.create(newShipmentCrate),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shipmentCrate'] })
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
          message: 'Failed to create new shipment crate',
          status: 'error',
        })
      )
      console.error('Error creating shipment crate:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => shipmentCratesService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipmentCrate'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('Shipment crate deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all shipment crate from the database',
          status: 'error',
        })
      )
      console.error('Error deleting shipment crate:', error)
    },
  })

  const createCrate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const shipmentId = parseInt(
      (form.elements.namedItem('shipmentId') as HTMLInputElement).value,
      10
    )

    const crateId = parseInt(
      (form.elements.namedItem('crateId') as HTMLInputElement).value,
      10
    )

    const newShipmentCrate: CreateShipmentCrateType = {
      shipmentId,
      crateId,
    }

    createCrateMutation.mutate(newShipmentCrate)
  }

  const deleteAllShipmentCrate = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching shipment crate data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={shipmentCrate} columns={columns} search={false} />

      <form onSubmit={createCrate} className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="shipment ID"
            name="shipmentId"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="crate ID"
            name="crateId"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button
            type="submit"
            text="Create shipment crate"
            onClick={() => {}}
          />
          <Button
            text="Delete all shipment crate"
            onClick={deleteAllShipmentCrate}
          />
        </div>
      </form>
    </div>
  )
}

export default ShipmentCrateTable
