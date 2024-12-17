import { useEffect, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

const pageSizes = [10, 20, 30, 40, 50]

interface TableProps<T> {
  data: T[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[]
  search?: boolean
}

const Table = <T extends object>({ data, columns, search }: TableProps<T>) => {
  const [filteredData, setFilteredData] = useState<T[]>(data)
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSizes[0],
  })
  const [sorting, setSorting] = useState([])

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
      sorting,
    },
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  })

  return (
    <div className="flex flex-col gap-y-4">
      {/* Search Input */}
      {search !== false && (
        <div className="w-full justify-start">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
            className="w-full md:w-1/4 lg:w-1/2 border rounded p-2"
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="bg-gray-50" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className={`text-left ${
                      header.column.columns.length
                        ? 'text-lg font-semibold'
                        : 'text-md font-normal'
                    } whitespace-nowrap px-4 pt-2`}
                    colSpan={header.column.columns.length}
                    key={header.id}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        onClick={() => {
                          header.column.toggleSorting()
                        }}
                        className="flex items-center gap-x-2"
                      >
                        <span className="">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        <div
                          className={`ml-2 text-sm ${
                            header.column.getIsSorted()
                              ? 'text-atec'
                              : 'text-gray-500'
                          }`}
                        >
                          {header.column.getIsSorted() === 'asc' ? (
                            <i className="material-icons text-sm">
                              arrow_upward
                            </i>
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <i className="material-icons text-sm">
                              arrow_downward
                            </i>
                          ) : null}
                        </div>
                      </button>
                    ) : (
                      // If the column is not sortable, just render the header text
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
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
                  <td className="py-3 text-gray-500 px-4" key={cell.id}>
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
      </div>

      {/* Pagination Controls */}
      {table.getRowCount() > pageSizes[0] && (
        <div className="flex flex-col gap-y-2">
          <div className="grid lg:grid-cols-3">
            <span className="flex items-center justify-start gap-1">
              <div className="hidden lg:block">Page</div>
              <strong className="hidden lg:block">
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount().toLocaleString()}
              </strong>
            </span>

            <div className="flex items-center justify-center gap-x-2">
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

            <div className="flex justify-end gap-1 items-center ">
              <div className="hidden lg:block text-gray-500">
                Items per page
              </div>
              <select
                className="hidden lg:block border rounded p-1"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
                }}
              >
                {pageSizes.map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden lg:block text-gray-500 whitespace-nowrap">
            Showing {table.getRowModel().rows.length} of {table.getRowCount()}{' '}
            Rows
          </div>
        </div>
      )}
    </div>
  )
}

export default Table
