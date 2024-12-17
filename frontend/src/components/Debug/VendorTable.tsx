// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import vendorsService from '../../services/vendorsService'
import { CreateVendorType, VendorType } from '../../types/vendor'
import Button from '../Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<VendorType>()

const columns = [
  {
    header: 'Vendors',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'Id',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const VendorTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: vendors = [],
    isLoading,
    isError,
  } = useQuery<VendorType[]>({
    queryKey: ['vendors'],
    queryFn: vendorsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createVendorMutation = useMutation({
    mutationFn: (newVendor: CreateVendorType) =>
      vendorsService.create(newVendor),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      console.log('Vendor created:', data)
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
          message: 'Failed to create new vendor',
          status: 'error',
        })
      )
      console.error('Error creating vendor:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => vendorsService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('Vendors deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all vendors from the database',
          status: 'error',
        })
      )
      console.error('Error deleting vendors:', error)
    },
  })

  const createVendor = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const nameValue = (form.elements.namedItem('name') as HTMLInputElement)
      .value

    const newVendor: CreateVendorType = {
      name: nameValue,
    }

    createVendorMutation.mutate(newVendor)
  }

  const deleteAllVendors = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching vendor data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={vendors} columns={columns} search={false} />

      <form onSubmit={createVendor} className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="name"
            name="name"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button type="submit" text="Create Vendor" onClick={() => {}} />
          <Button text="Delete all vendors" onClick={deleteAllVendors} />
        </div>
      </form>
    </div>
  )
}

export default VendorTable
