import { useState } from 'react'

const CsvFileUpload = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]) // Set the selected file
    }
  }

  if (file)
    return (
      <div>
        <p>File Name: {file.name}</p>
        <p>File Size: {file.size} bytes</p>
        <p>File Type: {file.type}</p>
        <button
          onClick={() => {
            setFile(null)
          }}
        >
          Reset file
        </button>
      </div>
    )

  return <input type="file" accept=".csv" onChange={handleFileChange} />
}
export default CsvFileUpload
