import Body from '../Body'
import { Subtitle, Title } from '../Text'
import ShipmentsForm from './ShipmentsForm'

const Shipments = () => {
  return (
    <Body>
      <div className="flex flex-col space-y-4">
        <ShipmentsForm />
      </div>
    </Body>
  )
}

export default Shipments
