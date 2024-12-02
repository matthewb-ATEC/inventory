import { useEffect, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ConsumableType } from '../../types'
import consumablesService from '../../services/consumablesService'

const columnHelper = createColumnHelper<ConsumableType>()

const columns = [
  {
    header: 'Item',
    columns: [
      columnHelper.accessor('sku', {
        header: () => 'SKU',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),
    ],
  },

  {
    header: 'Stock',
    columns: [
      columnHelper.accessor('totalStock', {
        header: () => 'Total',
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('availableStock', {
        header: () => 'Available',
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('shelfStock', {
        header: () => 'On Shelf',
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('overStock', {
        header: () => 'Overstock',
        cell: (info) => info.renderValue(),
      }),
    ],
  },

  {
    header: 'Locations',
    columns: [
      columnHelper.accessor('shelfStockLocation', {
        header: () => 'Shelf',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('overStockLocation', {
        header: () => 'Overstock',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const ConsumablesTable = () => {
  const [data, setData] = useState<ConsumableType[]>([])
  const [filteredData, setFilteredData] = useState<ConsumableType[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    const getConsumables = async (): Promise<void> => {
      try {
        const response = await consumablesService.getAll()
        setData(response)
      } catch (error) {
        console.error('Failed to fetch consumables:', error)
      }
    }
    void getConsumables()
  }, [])

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    )
  }, [searchQuery, data])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  })

  return (
    <div className="flex flex-col space-y-4">
      {/* Search Input */}
      <div className="w-full justify-start">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
          className="w-1/4s border rounded p-2"
        />
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="bg-gray-50" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={`text-left ${
                    header.column.columns.length ? 'text-lg' : 'text-md'
                  } font-normal`}
                  colSpan={header.column.columns.length}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="bg-gray-50 odd:bg-white" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="py-3 text-gray-500" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      {/* Pagination Controls */}
      <div className="flex flex-col space-y-2">
        <div className="grid grid-cols-3">
          <span className="flex items-center justify-start gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>

          <div className="flex items-center justify-center space-x-2">
            <button
              className={`${
                table.getCanPreviousPage() ? 'text-gray-500' : 'text-gray-300'
              } flex items-center`}
              onClick={() => {
                table.setPageIndex(0)
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <i className="material-icons">first_page</i>
            </button>
            <button
              className={`${
                table.getCanPreviousPage() ? 'text-gray-500' : 'text-gray-300'
              } flex items-center`}
              onClick={() => {
                table.previousPage()
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <i className="material-icons">chevron_left</i>
            </button>
            <button
              className={`${
                table.getCanNextPage() ? 'text-gray-500' : 'text-gray-300'
              } flex items-center`}
              onClick={() => {
                table.nextPage()
              }}
              disabled={!table.getCanNextPage()}
            >
              <i className="material-icons">chevron_right</i>
            </button>
            <button
              className={`${
                table.getCanNextPage() ? 'text-gray-500' : 'text-gray-300'
              } flex items-center`}
              onClick={() => {
                table.setPageIndex(table.getPageCount() - 1)
              }}
              disabled={!table.getCanNextPage()}
            >
              <i className="material-icons">last_page</i>
            </button>
          </div>

          <div className="flex justify-end gap-1">
            <div className="text-gray-500">Items per page</div>
            <select
              className="border rounded p-1"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-gray-500">
          Showing {table.getRowModel().rows.length} of {table.getRowCount()}{' '}
          Rows
        </div>
      </div>
    </div>
  )
}

export default ConsumablesTable
