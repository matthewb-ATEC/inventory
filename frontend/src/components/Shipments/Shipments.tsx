import Body from '../Body'
import ShipmentsForm from './ShipmentsForm'

const Shipments = () => {
  return (
    <Body>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-xl font-semibold" htmlFor="shipments">
            Shipments
          </label>
          <div className="text-gray-500">
            Track resource changes related to incoming or outgoing shipments
          </div>
        </div>
        <ShipmentsForm />
      </div>
    </Body>
  )
}

export default Shipments
