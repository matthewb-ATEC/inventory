// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import materialsService from '../../services/materialsService'
import { CreateMaterialType, MaterialType } from '../../types/material'
import Button from '../Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<MaterialType>()

const columns = [
  {
    header: 'Materials',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'Id',
        cell: (info) => info.getValue(),
      }),
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

const StockTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: materials = [],
    isLoading,
    isError,
  } = useQuery<MaterialType[]>({
    queryKey: ['materials'],
    queryFn: materialsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createMaterialMutation = useMutation({
    mutationFn: (newMaterial: CreateMaterialType) =>
      materialsService.create(newMaterial),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['materials'] })
      console.log('materials created:', data)
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
          message: 'Failed to create new materials',
          status: 'error',
        })
      )
      console.error('Error creating materials:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => materialsService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('Materials deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all materials from the database',
          status: 'error',
        })
      )
      console.error('Error deleting materials:', error)
    },
  })

  const createMaterials = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const partNumber = (
      form.elements.namedItem('partNumber') as HTMLInputElement
    ).value

    const description = (
      form.elements.namedItem('description') as HTMLInputElement
    ).value

    const thickness = form.elements.namedItem('thickness')
      ? parseInt(
          (form.elements.namedItem('thickness') as HTMLInputElement).value,
          10
        )
      : undefined

    const width = form.elements.namedItem('width')
      ? parseInt(
          (form.elements.namedItem('width') as HTMLInputElement).value,
          10
        )
      : undefined

    const length = form.elements.namedItem('length')
      ? parseInt(
          (form.elements.namedItem('length') as HTMLInputElement).value,
          10
        )
      : undefined

    const color = form.elements.namedItem('color')
      ? (form.elements.namedItem('color') as HTMLInputElement).value
      : undefined

    const tag = form.elements.namedItem('tag')
      ? (form.elements.namedItem('tag') as HTMLInputElement).value
      : undefined

    const vendorId = parseInt(
      (form.elements.namedItem('vendorId') as HTMLInputElement).value,
      10
    )

    const newMaterial: CreateMaterialType = {
      partNumber,
      description,
      thicknessInches: thickness,
      widthInches: width,
      lengthInches: length,
      color,
      tag,
      vendorId,
    }

    createMaterialMutation.mutate(newMaterial)
  }

  const deleteAllMaterials = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching materials data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={materials} columns={columns} search={false} />

      <form onSubmit={createMaterials} className="flex flex-col gap-y-4">
        <div className="flex items-center flex-wrap gap-x-4">
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="part number"
            name="partNumber"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="description"
            name="description"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="thickness"
            name="thicknessInches"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="width"
            name="widthInches"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="length"
            name="lengthInches"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="color"
            name="color"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="tag"
            name="tag"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="vendor ID"
            name="vendorId"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button type="submit" text="Create materials" onClick={() => {}} />
          <Button text="Delete all materials" onClick={deleteAllMaterials} />
        </div>
      </form>
    </div>
  )
}

export default StockTable
