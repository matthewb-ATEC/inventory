import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { MaterialType, ProjectType, StockType } from '../../types'
import materialsService from '../../services/materialsService'
import { vendors } from '../../data'
import stockService from '../../services/stockService'
import Table from '../Table'
import { createColumnHelper } from '@tanstack/react-table'
import Button from '../Button'
import { Text } from '../Text'

const columnHelper = createColumnHelper<StockType>()

const columns = [
  {
    header: 'Material',
    columns: [
      columnHelper.accessor('material.partDescription', {
        header: () => 'Description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.size', {
        header: () => 'Size',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.color', {
        header: () => 'Color',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: 'Stock',
    columns: [
      columnHelper.accessor('quantity', {
        header: () => 'Quantity',
        cell: (info) => info.renderValue(),
      }),
    ],
  },
]

const CsvFileUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploadedStocks, setUploadedStocks] = useState<StockType[]>([])
  const [existingMaterials, setExistingMaterials] = useState<MaterialType[]>([])

  const getMaterials = async () => {
    const materials = await materialsService.getAll()
    setExistingMaterials(materials)
  }

  useEffect(() => {
    void getMaterials()
  }, [])

  const increaseStock = async (material: MaterialType) => {
    try {
      const uploadedStock = uploadedStocks.find(
        (stock) => stock.material.partNumber === material.partNumber
      )

      if (!uploadedStock) {
        console.error(
          `No matching stock found for material: ${material.partNumber}`
        )
        return
      }

      const projectNumber = uploadedStock.project
        ? uploadedStock.project.number
        : undefined

      const currentStock = await stockService.getMaterialStock(
        material,
        projectNumber
      )

      const newQuantity: number = currentStock.quantity + uploadedStock.quantity

      const newStock: StockType = {
        ...currentStock,
        quantity: newQuantity,
      }

      await stockService.update(currentStock.id, newStock)
    } catch (error: unknown) {
      console.log(
        `Error increasing stock for material ${material.partNumber}: ${error}`
      )
    }
  }

  const addMaterialToCatalog = async (material: MaterialType) => {
    try {
      const response = await materialsService.create(material)

      const matchingStock = uploadedStocks.find(
        (stock) => stock.material.partNumber === material.partNumber
      )

      if (!matchingStock) {
        console.error(
          `No matching stock found for material: ${material.partNumber}`
        )
        return
      }

      const newStock = {
        id: matchingStock.id,
        material: response,
        project: matchingStock.project,
        quantity: matchingStock.quantity,
      }

      await stockService.create(newStock)
    } catch (error: unknown) {
      console.log(
        `Error adding material ${material.partNumber} to the database: ${error}`
      )
    }
  }

  const processShipment = async () => {
    const stocksForIncrease = uploadedStocks.filter((stock) =>
      existingMaterials.some(
        (material) => material.partNumber === stock.material.partNumber
      )
    )

    const newStocksForCatalog = uploadedStocks.filter(
      (stock) =>
        !existingMaterials.some(
          (material) => material.partNumber === stock.material.partNumber
        )
    )

    const processedStockIds = new Set<number>()

    await Promise.all(
      stocksForIncrease.map(async (stock) => {
        await increaseStock(stock.material)
        processedStockIds.add(stock.id)
      })
    )

    await Promise.all(
      newStocksForCatalog.map(async (stock) => {
        await addMaterialToCatalog(stock.material)
        processedStockIds.add(stock.id)
      })
    )

    setUploadedStocks((prev) =>
      prev.filter((stock) => !processedStockIds.has(stock.id))
    )
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)

      const reader = new FileReader()

      reader.onload = (e) => {
        const content = e.target?.result as string
        parseCsv(content) // Parse the CSV data into rows and columns
      }

      reader.readAsText(selectedFile)
    }
  }

  // Handles cells with commas in their data
  const preprocessCsv = (data: string): string => {
    return data
      .split('\n')
      .map((line) =>
        line
          .split(',')
          .map((cell) => {
            if (cell.includes(',') && !cell.startsWith('"')) {
              return `"${cell.trim()}"`
            }
            return cell.trim()
          })
          .join(',')
      )
      .join('\n')
  }

  // Extracts the material tag from the string commmonly in the 'size' cell
  const parseCustomerPN = (data: string) => {
    const regex = /Customer PN:\s*(\S+)/
    const match = regex.exec(data)
    return match ? match[1] : null
  }

  // Extracts the dimensions from the 'size' cell
  const parseSize = (data: string) => {
    const regex =
      /(\d+(?:\.\d+)?"(?:[A-Za-z])?)\s*x\s*(\d+(?:\.\d+)?"(?:[A-Za-z])?)\s*x\s*(\d+(?:\.\d+)?"(?:[A-Za-z])?)/
    const match = regex.exec(data)
    return match ? match[0] : null
  }

  const parseCsv = (data: string) => {
    const preprocessedData = preprocessCsv(data)

    Papa.parse(preprocessedData, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as string[][]

        // Extract project name from the 4th row
        const fourthRow = rows[3] ?? []
        const projectName = fourthRow[1]?.trim() ?? ''
        const project: ProjectType = {
          number: 0, // The spreadsheet does not contain the project number
          name: projectName,
        }

        // Extract materials starting from the 10th row
        const materials = rows.slice(10)
        const jsonData = materials
          .map((row) => {
            const quantity = parseInt(row[7]?.trim() || '0', 10)

            // Skip rows with invalid quantity
            if (isNaN(quantity) || quantity === 0) {
              return null
            }

            const material: MaterialType = {
              id: 0,
              partNumber: row[1]?.trim(),
              partDescription: row[2]?.trim(),
              size: parseSize(row[3]?.trim()),
              color: row[5]?.trim(),
              vendor: vendors[0],
              tag: parseCustomerPN(row[3]?.trim()),
            }

            const stock: StockType = {
              id: 0,
              material,
              project: project,
              quantity,
            }

            return { material, stock }
          })
          .filter((item) => item !== null)

        setUploadedStocks(jsonData.map((object) => object.stock))
      },
      error: (error: unknown) => {
        console.error('Error parsing CSV:', error)
      },
    })
  }

  if (file)
    return (
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between">
          <Text text={`File Name: ${file.name}`} />
          <button
            className="w-fit text-red-500"
            onClick={() => {
              setFile(null)
            }}
          >
            Reset file
          </button>
        </div>

        {uploadedStocks.length > 0 && (
          <div className="flex flex-col space-y-8">
            <Table data={uploadedStocks} columns={columns} search={false} />
            <Button
              text="Confirm Shipment"
              onClick={() => {
                void processShipment()
              }}
            />
          </div>
        )}
      </div>
    )

  return <input type="file" accept=".csv" onChange={handleFileChange} />
}

export default CsvFileUpload
