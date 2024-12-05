import { useState } from 'react'
import { projects } from '../../data'
import { Header, Subtitle, Title } from '../Text'
import CsvFileUpload from './CsvFileUpload'

const shipmentStatuses = ['Arriving at Warehouse', 'Leaving Warehouse']

const ShipmentsForm = () => {
  const [shipmentStatus, setShipmentStatus] = useState<string>('')
  return (
    <form className="flex flex-col space-y-4 bg-white p-8 rounded-md shadow-md">
      <div className="flex flex-col space-y-2">
        <Title text="Shipments" />
        <Subtitle text="Track resource changes related to incoming or outgoing shipments" />
      </div>
      <div className="flex flex-col space-y-2">
        <Header text="Tracking" />

        <div className="flex flex-col space-y-2 items-center w-1/2">
          <div className="flex items-center space-x-4 w-full">
            <label className="text-gray-500 text-nowrap">Shipment Status</label>
            <select
              className="border-b-2 border-gray-300 w-full py-2 pr-2"
              value={shipmentStatus}
              onChange={(event) => {
                setShipmentStatus(event.target.value)
              }}
            >
              {shipmentStatuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {shipmentStatus === shipmentStatuses[1] && (
            <div className="flex items-center space-x-4 w-full">
              <label className="text-gray-500 text-nowrap">
                Destination Site
              </label>
              <select className="border-b-2 border-gray-300 w-full py-2 pr-2">
                {projects.map((project, index) => (
                  <option key={index} value={project.name}>
                    {project.number} {project.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <Header text="Purchase Order" />
        <CsvFileUpload />
      </div>
    </form>
  )
}

export default ShipmentsForm
