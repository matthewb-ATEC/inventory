import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { MaterialType, StockType } from '../../types'
import materialsService from '../../services/materialsService'
import { vendors } from '../../data'
import stockService from '../../services/stockService'

const CsvFileUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploadedMaterials, setUploadedMaterials] = useState<MaterialType[]>([])
  const [uploadedStocks, setUploadedStocks] = useState<StockType[]>([])
  const [existingMaterials, setExistingMaterials] = useState<MaterialType[]>([])

  const getMaterials = async () => {
    const materials = await materialsService.getAll()
    setExistingMaterials(materials)
  }

  useEffect(() => {
    void getMaterials()
  }, [])

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    material: MaterialType
  ) => {
    event.preventDefault()
    void addToDatabase(material)
  }

  const addToDatabase = async (material: MaterialType) => {
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

      void getMaterials()
    } catch (error: unknown) {
      console.log(
        `Error adding material ${material.partNumber} to the database: ${error}`
      )
    }
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

  const parseCustomerPN = (data: string) => {
    const regex = /Customer PN:\s*(\S+)/
    const match = regex.exec(data)
    return match ? match[1] : null
  }

  const parseCsv = (data: string) => {
    const preprocessedData = preprocessCsv(data)

    Papa.parse(preprocessedData, {
      header: false, // If your CSV has no header, keep this as false
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as string[][]

        // Extract project name from the 4th row
        const fourthRow = rows[3] ?? []
        const project = fourthRow[1]?.trim() ?? ''

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
              size: row[3]?.trim() ?? null,
              color: row[5]?.trim() ?? null,
              vendor: vendors[0],
              tag: parseCustomerPN(row[3]?.trim()) ?? null,
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

        setUploadedMaterials(jsonData.map((object) => object.material))
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
        <div className="flex flex-col space-y-4">
          <p>File Name: {file.name}</p>
          <button
            onClick={() => {
              setFile(null)
            }}
          >
            Reset file
          </button>
        </div>

        {uploadedMaterials.length > 0 && (
          <div className="flex flex-col space-y-4">
            {uploadedMaterials.map((material) => (
              <div
                key={material.partNumber}
                className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]"
              >
                <div>{material.partNumber}</div>
                <div>{material.partDescription}</div>
                <div>{material.size}</div>
                <div>{material.color}</div>

                {existingMaterials.some(
                  (existingMaterial) =>
                    existingMaterial.partNumber === material.partNumber
                ) ? (
                  <div>Already in database</div>
                ) : (
                  <>
                    <div>NOT in database</div>
                    <button
                      onClick={(event) => {
                        handleClick(event, material)
                      }}
                    >
                      Add to database
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )

  return <input type="file" accept=".csv" onChange={handleFileChange} />
}

export default CsvFileUpload