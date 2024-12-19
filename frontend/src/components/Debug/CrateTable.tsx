// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import cratesService from '../../services/cratesService'
import { CreateCrateType, CrateType } from '../../types/crate'
import Button from '../Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<CrateType>()

const columns = [
  {
    header: 'Crates',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'Id',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('number', {
        header: () => 'Number',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: 'Location',
    columns: [
      columnHelper.accessor('location.aisle', {
        header: () => 'Aisle',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('location.col', {
        header: () => 'Column',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('location.shelf', {
        header: () => 'Shelf',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: 'Project',
    columns: [
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
]

const CrateTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: crates = [],
    isLoading,
    isError,
  } = useQuery<CrateType[]>({
    queryKey: ['crates'],
    queryFn: cratesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createCrateMutation = useMutation({
    mutationFn: (newCrate: CreateCrateType) => cratesService.create(newCrate),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['crates'] })
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
          message: 'Failed to create new crate',
          status: 'error',
        })
      )
      console.error('Error creating crate:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => cratesService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crates'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('crates deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all crates from the database',
          status: 'error',
        })
      )
      console.error('Error deleting crates:', error)
    },
  })

  const createCrate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const number = (form.elements.namedItem('number') as HTMLInputElement).value

    const locationId = parseInt(
      (form.elements.namedItem('locationId') as HTMLInputElement).value,
      10
    )

    const projectId = parseInt(
      (form.elements.namedItem('projectId') as HTMLInputElement).value,
      10
    )

    const newCrate: CreateCrateType = {
      number,
      locationId,
      projectId,
    }

    createCrateMutation.mutate(newCrate)
  }

  const deleteAllCrates = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching crate data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={crates} columns={columns} search={false} />

      <form onSubmit={createCrate} className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="number"
            name="number"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="location ID"
            name="locationId"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="project ID"
            name="projectId"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button type="submit" text="Create crate" onClick={() => {}} />
          <Button text="Delete all crates" onClick={deleteAllCrates} />
        </div>
      </form>
    </div>
  )
}

export default CrateTable
