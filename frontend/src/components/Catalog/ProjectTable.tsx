import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'
import { useEffect, useState } from 'react'
import { ProjectType } from '../../types'
import projectsService from '../../services/projectService'

const columnHelper = createColumnHelper<ProjectType>()

const columns = [
  {
    header: 'Projects',
    columns: [
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
  const [projects, setProjects] = useState<ProjectType[]>([])

  const getProjects = async () => {
    setProjects(await projectsService.getAll())
  }

  useEffect(() => {
    void getProjects()
  }, [])

  return <Table data={projects} columns={columns} />
}

export default ProjectTable
