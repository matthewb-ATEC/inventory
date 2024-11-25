const Shipments = () => {
  return (
    <div className="bg-gray-50 flex flex-grow items-center justify-center">
      <form className="flex flex-col space-y-4 bg-white p-8 rounded-md shadow-md m-6 md:m-16">
        <div className="flex flex-col space-y-2">
          <label className="text-xl font-semibold" htmlFor="shipments">
            Shipments
          </label>
          <div className="text-gray-500">
            Track resource changes related to incoming or outgoing shipments
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xl" htmlFor="direction">
            Direction
          </label>
          <select className="border-b-2 border-gray-300 p-2">
            <option value="Inbound">Inbound</option>
            <option value="Outbound">Outbound</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xl" htmlFor="vendor">
            Vendor
          </label>
          <select className="border-b-2 border-gray-300 p-2"></select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xl" htmlFor="commitment">
            Commitment
          </label>
          <select className="border-b-2 border-gray-300 p-2"></select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xl" htmlFor="lineItem">
            Line Items
          </label>
          <select className="border-b-2 border-gray-300 p-2"></select>
          <select className="border-b-2 border-gray-300 p-2"></select>
          <select className="border-b-2 border-gray-300 p-2"></select>
          <select className="border-b-2 border-gray-300 p-2"></select>
          <select className="border-b-2 border-gray-300 p-2"></select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xl" htmlFor="">
            Quantities
          </label>
          <select className="border-b-2 border-gray-300 p-2"></select>
          <select className="border-b-2 border-gray-300 p-2"></select>
          <select className="border-b-2 border-gray-300 p-2"></select>
          <select className="border-b-2 border-gray-300 p-2"></select>
          <select className="border-b-2 border-gray-300 p-2"></select>
        </div>
      </form>
    </div>
  )
}

export default Shipments
