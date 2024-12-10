import Body from '../Body'
import Container from '../Container'
import { Subtitle, Title } from '../Text'
import InventoryTable from './InventoryTable'

const Inventory = () => {
  return (
    <Body>
      <Container>
        <Title text={'Inventory'} />
        <Subtitle text="View total and project specific stock" />
        <InventoryTable />
      </Container>
    </Body>
  )
}

export default Inventory
