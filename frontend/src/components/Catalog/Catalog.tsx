import RemoveFromCatalogForm from './RemoveFromCatalogForm'
import AddToCatalogForm from './AddToCatalogForm'
import MaterialTable from './MaterialTable'
import VendorTable from './VendorTable'
import Container from '../Container'
import ProjectTable from './ProjectTable'

const userIsAdmin = false

const Catalog = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (userIsAdmin)
    return (
      <div className="flex flex-col space-y-8 lg:space-y-0 lg:grid lg:gap-x-8 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col space-y-8 flex-grow">
          <AddToCatalogForm />
          <RemoveFromCatalogForm />
        </div>
        <Container>
          <MaterialTable />
          <VendorTable />
          <ProjectTable />
        </Container>
      </div>
    )

  return (
    <Container>
      <MaterialTable />
      <div className="grid grid-cols-[1fr_1fr] gap-8">
        <VendorTable />
        <ProjectTable />
      </div>
    </Container>
  )
}

export default Catalog
