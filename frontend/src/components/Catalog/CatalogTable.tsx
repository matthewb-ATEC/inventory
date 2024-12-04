import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'
import Container from '../Container'
import { Subtitle, Title } from '../Text'
import { useEffect, useState } from 'react'
import Loading from '../Loading'
import itemsService from '../../services/itemsService'
import { ItemType } from '../../types'

const columnHelper = createColumnHelper<ItemType>()

const itemsColumns = [
  columnHelper.accessor('sku', {
    header: () => 'SKU',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: () => 'Type',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: () => 'Category',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('unitOfMeasure', {
    header: () => 'Unit Of Measure',
    cell: (info) => info.getValue(),
  }),
]

const CatalogTable = () => {
  const [items, setItems] = useState<ItemType[]>([])

  useEffect(() => {
    const getItems = async (): Promise<void> => {
      try {
        const response = await itemsService.getAll()
        setItems(response)
      } catch (error) {
        console.error('Failed to fetch items:', error)
      }
    }
    void getItems()
  }, [])

  if (!items.length) return <Loading />

  return (
    <Container>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <Title text="Catalog" />
          <Subtitle text="Each unique item tracked in inventory" />
        </div>
        <Table data={items} columns={itemsColumns} />
      </div>
    </Container>
  )
}

export default CatalogTable
