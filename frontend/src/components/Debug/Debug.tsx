import Container from '../Container'
import Button from '../Button'

import materialsService from '../../services/materialsService'
import stockService from '../../services/stockService'
import projectsService from '../../services/projectsService'

import MaterialTable from './MaterialTable'
import StockTable from './StockTable'
import ProjectTable from './ProjectTable'
import VendorTable from './VendorTable'

const Debug = () => {
  const resetDatabase = async () => {
    try {
      await materialsService.removeAll()
      await stockService.removeAll()
      await projectsService.removeAll()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col gap-y-8">
      <Container>
        <Button
          text="Reset Database"
          onClick={() => {
            void resetDatabase()
          }}
        />
      </Container>

      <Container>
        <MaterialTable />
      </Container>

      <Container>
        <StockTable />
      </Container>

      <Container>
        <ProjectTable />
      </Container>

      <Container>
        <VendorTable />
      </Container>
    </div>
  )
}

export default Debug
