import Container from '../Container'
import Button from '../Button'

import { QueryClient } from '@tanstack/react-query'
import materialsService from '../../services/materialsService'
import stockService from '../../services/stockService'
import projectsService from '../../services/projectsService'
import vendorsService from '../../services/vendorsService'

import MaterialTable from './MaterialTable'
import StockTable from './StockTable'
import ProjectTable from './ProjectTable'
import VendorTable from './VendorTable'
import CrateTable from './CrateTable'
import LocationTable from './LocationTable'
import cratesService from '../../services/cratesService'
import locationsService from '../../services/locationsService'
import CrateStockTable from './CrateStockTable'
import ShipmentTable from './ShipmentTable'
import ShipmentCrateTable from './ShipmentCratesTable'
import RequestTable from './RequestTable'
import RequestStockTable from './RequestStockTable'

const Debug = () => {
  const queryClient = new QueryClient()

  const resetDatabase = async () => {
    try {
      await materialsService.removeAll()
      await stockService.removeAll()
      await projectsService.removeAll()
      await vendorsService.removeAll()
      await cratesService.removeAll()
      await locationsService.removeAll()

      queryClient.invalidateQueries({ queryKey: ['materials'] })
      queryClient.invalidateQueries({ queryKey: ['stock'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      queryClient.invalidateQueries({ queryKey: ['crates'] })
      queryClient.invalidateQueries({ queryKey: ['locations'] })
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

      <Container>
        <LocationTable />
      </Container>

      <Container>
        <CrateTable />
      </Container>

      <Container>
        <CrateStockTable />
      </Container>

      <Container>
        <ShipmentTable />
      </Container>

      <Container>
        <ShipmentCrateTable />
      </Container>

      <Container>
        <RequestTable />
      </Container>

      <Container>
        <RequestStockTable />
      </Container>
    </div>
  )
}

export default Debug
