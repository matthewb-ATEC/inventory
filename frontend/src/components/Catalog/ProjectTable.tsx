import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'
import { useEffect, useState } from 'react'
import { ProjectType } from '../../types'
import stockService from '../../services/stockService'

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
    const stocks = await stockService.getAll()

    const projectTypes = Array.from(
      new Set(
        stocks
          .map((stock) => stock.project)
          .filter((project) => project !== null)
      )
    ).map((project) => ({ number: 0, name: project }))

    setProjects(projectTypes)
  }

  useEffect(() => {
    void getProjects()
  }, [])

  return <Table data={projects} columns={columns} />
}

export default ProjectTable
