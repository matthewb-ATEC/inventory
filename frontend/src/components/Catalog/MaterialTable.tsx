import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'
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
      columnHelper.accessor('description', {
        header: () => 'Description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('color', {
        header: () => 'Color',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('vendor.name', {
        header: () => 'Vendor',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('tag', {
        header: () => 'Tag',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: 'Size',
    columns: [
      columnHelper.accessor('thicknessInches', {
        header: () => 'Thickness',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('widthInches', {
        header: () => 'Width',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('lengthInches', {
        header: () => 'Length',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('squareFeet', {
        header: () => 'Square Feet',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const MaterialTable = () => {
  const [materials, setMaterials] = useState<MaterialType[]>([])

  const getMaterials = async () => {
    const materials = await materialsService.getAll()
    setMaterials(materials)
  }

  useEffect(() => {
    void getMaterials()
  }, [])

  return <Table data={materials} columns={columns} />
}

export default MaterialTable
