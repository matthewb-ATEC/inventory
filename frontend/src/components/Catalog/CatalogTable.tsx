import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'
import Container from '../Container'
import { Subtitle, Title } from '../Text'
import { MaterialType } from '../../types'
import { useEffect, useState } from 'react'
import materialsService from '../../services/materialsService'

const columnHelper = createColumnHelper<MaterialType>()

const columns = [
  {
    header: 'Material',
    columns: [
      columnHelper.accessor('partNumber', {
        header: () => 'Part Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('partDescription', {
        header: () => 'Description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('size', {
        header: () => 'Size',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('color', {
        header: () => 'Color',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('vendor', {
        header: () => 'Vendor',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('tag', {
        header: () => 'Tag',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const CatalogTable = () => {
  const [materials, setMaterials] = useState<MaterialType[]>([])

  const getMaterials = async () => {
    const materials = await materialsService.getAll()
    setMaterials(materials)
  }

  useEffect(() => {
    void getMaterials()
  }, [])

  return (
    <Container>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <Title text="Catalog" />
          <Subtitle text="Each unique item tracked in inventory" />
        </div>
        <Table data={materials} columns={columns} />
      </div>
    </Container>
  )
}

export default CatalogTable
