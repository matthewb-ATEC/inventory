// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import projectsService from '../../services/projectsService'
import { CreateProjectType, ProjectType } from '../../types/project'
import Button from '../Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<ProjectType>()

const columns = [
  {
    header: 'Projects',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'Id',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('number', {
        header: () => 'Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const ProjectTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery<ProjectType[]>({
    queryKey: ['projects'],
    queryFn: projectsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createProjectMutation = useMutation({
    mutationFn: (newProject: CreateProjectType) =>
      projectsService.create(newProject),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      console.log('Project created:', data)
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
          message: 'Failed to create new project',
          status: 'error',
        })
      )
      console.error('Error creating project:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => projectsService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('Projects deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all projects from the database',
          status: 'error',
        })
      )
      console.error('Error deleting projects:', error)
    },
  })

  const createProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const numberValue = parseInt(
      (form.elements.namedItem('number') as HTMLInputElement).value,
      10
    )
    const nameValue = (form.elements.namedItem('name') as HTMLInputElement)
      .value

    const newProject: CreateProjectType = {
      number: numberValue,
      name: nameValue,
    }

    createProjectMutation.mutate(newProject)
  }

  const deleteAllProjects = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching project data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={projects} columns={columns} search={false} />

      <form onSubmit={createProject} className="flex flex-col gap-y-4">
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
            placeholder="name"
            name="name"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button type="submit" text="Create project" onClick={() => {}} />
          <Button text="Delete all projects" onClick={deleteAllProjects} />
        </div>
      </form>
    </div>
  )
}

export default ProjectTable
