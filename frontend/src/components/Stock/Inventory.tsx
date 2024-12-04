import Body from '../Body'
import Container from '../Container'
import { Title } from '../Text'
import InventoryTable from './InventoryTable'

const Inventory = () => {
  return (
    <Body>
      <Container>
        <Title text={'Inventory'} />
        <InventoryTable />
      </Container>
    </Body>
  )
}

export default Inventory
