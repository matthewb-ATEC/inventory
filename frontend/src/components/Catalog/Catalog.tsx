import RemoveFromCatalogForm from './RemoveFromCatalogForm'
import AddToCatalogForm from './AddToCatalogForm'
import MaterialTable from './MaterialTable'
import VendorTable from './VendorTable'
import Container from '../Container'
import ProjectTable from './ProjectTable'
import { Subtitle, Title } from '../Text'

const userIsAdmin = false

const Catalog = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (userIsAdmin)
    return (
      <div className="flex flex-col gap-y-8 lg:gap-y-0 lg:grid lg:gap-x-8 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-y-8 flex-grow">
          <AddToCatalogForm />
          <RemoveFromCatalogForm />
        </div>
        <Container>
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2">
              <Title text="Catalog" />
              <Subtitle text="Each unique item tracked in inventory" />
            </div>
            <MaterialTable />
          </div>
          <VendorTable />
          <ProjectTable />
        </Container>
      </div>
    )

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <Title text="Catalog" />
          <Subtitle text="Each unique item tracked in inventory" />
        </div>
        <MaterialTable />
      </div>
      {/*<div className="grid grid-cols-[1fr_1fr] gap-8">
        <VendorTable />
        <ProjectTable />
      </div>*/}
    </Container>
  )
}

export default Catalog
