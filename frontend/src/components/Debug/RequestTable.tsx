// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import requestsService from '../../services/requestsService'
import { CreateRequestType, RequestType } from '../../types/request'
import Button from '../Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<RequestType>()

const columns = [
  {
    header: 'Requests',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'Id',
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

const RequestTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery<RequestType[]>({
    queryKey: ['requests'],
    queryFn: requestsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createRequestMutation = useMutation({
    mutationFn: (newRequest: CreateRequestType) =>
      requestsService.create(newRequest),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
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
          message: 'Failed to create new request',
          status: 'error',
        })
      )
      console.error('Error creating request:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => requestsService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('Requests deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all requests from the database',
          status: 'error',
        })
      )
      console.error('Error deleting requests:', error)
    },
  })

  const createRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const projectId = parseInt(
      (form.elements.namedItem('projectId') as HTMLInputElement).value,
      10
    )

    const newRequest: CreateRequestType = {
      projectId,
    }

    createRequestMutation.mutate(newRequest)
  }

  const deleteAllRequests = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching request data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={requests} columns={columns} search={false} />

      <form onSubmit={createRequest} className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="project ID"
            name="projectId"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button type="submit" text="Create Request" onClick={() => {}} />
          <Button text="Delete all requests" onClick={deleteAllRequests} />
        </div>
      </form>
    </div>
  )
}

export default RequestTable
