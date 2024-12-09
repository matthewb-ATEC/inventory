import { useState } from 'react'
import Papa from 'papaparse'

const CsvFileUpload = () => {
  const [file, setFile] = useState<File | null>(null)

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

            return {
              partNumber: row[1]?.trim() || '',
              partDescription: row[2]?.trim() || '',
              size: row[3]?.trim() || '',
              color: row[5]?.trim() || '',
              unitCost: parseFloat(
                row[6]?.trim().replace('$', '').replace(',', '') || '0'
              ),
              quantity,
              project: project,
            }
          })
          .filter((item) => item !== null)

        console.log(jsonData)
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

        <div className="flex flex-col space-y-4"></div>
      </div>
    )

  return <input type="file" accept=".csv" onChange={handleFileChange} />
}

export default CsvFileUpload
