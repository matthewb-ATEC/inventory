import Body from '../Body'
import Container from '../Container'
import { Title } from '../Text'
import StockTable from './StockTable'

const Stock = () => {
  return (
    <Body>
      <Container>
        <Title text={'Stock'} />
        <StockTable />
      </Container>
    </Body>
  )
}

export default Stock
