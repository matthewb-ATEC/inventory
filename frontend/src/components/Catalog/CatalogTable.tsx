import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'
import Container from '../Container'
import { Subtitle, Title } from '../Text'
import { MaterialType } from '../../types'
import { catalog } from '../../data'

const columnHelper = createColumnHelper<MaterialType>()

const columns = [
  {
    header: 'Material',
    columns: [
      columnHelper.accessor('name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('vendor', {
        header: () => 'Vendor',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('size', {
        header: () => 'Size',
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
  return (
    <Container>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <Title text="Catalog" />
          <Subtitle text="Each unique item tracked in inventory" />
        </div>
        <Table data={catalog} columns={columns} />
      </div>
    </Container>
  )
}

export default CatalogTable
