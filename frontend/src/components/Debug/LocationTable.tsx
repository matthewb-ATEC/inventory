// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import locationsService from '../../services/locationsService'
import { CreateLocationType, LocationType } from '../../types/location'
import Button from '../Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<LocationType>()

const columns = [
  {
    header: 'Locations',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'ID',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('aisle', {
        header: () => 'Aisle',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('col', {
        header: () => 'Column',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('shelf', {
        header: () => 'Shelf',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const LocationTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: locations = [],
    isLoading,
    isError,
  } = useQuery<LocationType[]>({
    queryKey: ['locations'],
    queryFn: locationsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createLocationMutation = useMutation({
    mutationFn: (newLocation: CreateLocationType) =>
      locationsService.create(newLocation),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
      console.log('Location created:', data)
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
          message: 'Failed to create new location',
          status: 'error',
        })
      )
      console.error('Error creating location:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => locationsService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('locations deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all locations from the database',
          status: 'error',
        })
      )
      console.error('Error deleting locations:', error)
    },
  })

  const createLocation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const aisle = parseInt(
      (form.elements.namedItem('aisle') as HTMLInputElement).value,
      10
    )

    const col = (form.elements.namedItem('col') as HTMLInputElement).value

    const shelf = parseInt(
      (form.elements.namedItem('shelf') as HTMLInputElement).value,
      10
    )

    const newLocation: CreateLocationType = {
      aisle,
      col,
      shelf,
    }

    createLocationMutation.mutate(newLocation)
  }

  const deleteAllLocations = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching location data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={locations} columns={columns} search={false} />

      <form onSubmit={createLocation} className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="aisle"
            name="aisle"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="col"
            name="col"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="shelf"
            name="shelf"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button type="submit" text="Create location" onClick={() => {}} />
          <Button text="Delete all locations" onClick={deleteAllLocations} />
        </div>
      </form>
    </div>
  )
}

export default LocationTable
