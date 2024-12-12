import Container from '../Container'
import { Subtitle, Title } from '../Text'
import InventoryTable from './InventoryTable'

const Inventory = () => {
  return (
    <Container>
      <Title text={'Inventory'} />
      <Subtitle text="View total and project specific stock" />
      <InventoryTable />
    </Container>
  )
}

export default Inventory
