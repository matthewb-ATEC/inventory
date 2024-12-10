import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'
import { useEffect, useState } from 'react'
import materialsService from '../../services/materialsService'
import { VendorType } from '../../types'

const columnHelper = createColumnHelper<VendorType>()

const columns = [
  {
    header: 'Vendors',
    columns: [
      columnHelper.accessor('name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const VendorTable = () => {
  const [vendors, setVendors] = useState<VendorType[]>([])

  const getVendors = async () => {
    const materials = await materialsService.getAll()
    const vendorTypes = Array.from(
      new Set(materials.map((material) => material.vendor))
    ).map((vendor) => ({ name: vendor }))

    setVendors(vendorTypes)
  }

  useEffect(() => {
    void getVendors()
  }, [])

  return <Table data={vendors} columns={columns} />
}

export default VendorTable
