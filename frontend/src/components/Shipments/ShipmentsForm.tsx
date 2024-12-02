//import { useState } from 'react'

const ShipmentsForm = () => {
  //const [commitment, setCommitment] = useState<CommitmentType>()

  // Dummy data, eventually replace with a query to procore to retrive the appropriate commitment
  const commitment = {
    vendor: 'KCS',
    lineItems: [
      { id: 1, name: 'KCS Wall Panels', expectedQuantity: 30 },
      { id: 2, name: `2'-3/4" Automatic Door Opener`, expectedQuantity: 3 },
      { id: 3, name: 'Fan Filter Unit', expectedQuantity: 17 },
    ],
  }

  return (
    <form className="flex flex-col space-y-4 bg-white p-8 rounded-md shadow-md">
      <div className="flex flex-col space-y-2">
        <label className="font-semibold" htmlFor="lineItem">
          Tracking
        </label>
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4 w-full">
            <label className="text-gray-500" htmlFor="direction">
              Direction
            </label>
            <select className="border-b-2 border-gray-300 w-full py-2 pr-2">
              <option value="inbound">Inbound</option>
              <option value="outbound">Outbound</option>
            </select>
          </div>

          <div className="flex items-center space-x-4 w-full">
            <label className="text-gray-500" htmlFor="direction">
              Location
            </label>
            <select className="border-b-2 border-gray-300 w-full py-2 pr-2">
              <option value="innovationCenter">Innovation Center</option>
              <option value="site">Site</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold" htmlFor="lineItem">
          Commitment
        </label>
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4 w-full">
            <label className="text-gray-500" htmlFor="direction">
              Project
            </label>
            <select className="border-b-2 border-gray-300 w-full py-2 pr-2">
              <option value=""></option>
            </select>
          </div>
          <div className="flex items-center space-x-4 w-full">
            <label className="text-gray-500" htmlFor="direction">
              Vendor
            </label>
            <select className="border-b-2 border-gray-300 w-full py-2 pr-2">
              <option value=""></option>
            </select>
          </div>
          <div className="flex items-center space-x-4 w-full">
            <label className="text-gray-500" htmlFor="direction">
              Commitment
            </label>
            <select className="border-b-2 border-gray-300 w-full py-2 pr-2">
              <option value=""></option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold" htmlFor="lineItem">
          Line Items
        </label>
        {commitment.lineItems.map((lineItem) => (
          <div
            key={lineItem.id}
            className="flex w-full space-x-4 text-gray-500"
          >
            <div
              key={lineItem.id}
              className="flex w-full justify-between items-center"
            >
              <div>{lineItem.name}</div>
              <div className="flex items-center space-x-4">
                <label className="text-gray-500" htmlFor="direction">
                  Quantity Received
                </label>
                <input type="text" className="bg-gray-50 rounded-md p-2" />
              </div>
            </div>
            <div className="w-20">out of {lineItem.expectedQuantity}</div>
          </div>
        ))}
      </div>
    </form>
  )
}

export default ShipmentsForm
