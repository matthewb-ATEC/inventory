import Body from '../Body'
import CatalogTable from './CatalogTable'
import RemoveFromCatalogForm from './RemoveFromCatalogForm'
import AddToCatalogForm from './AddToCatalogForm'

const userIsAdmin = false

const Catalog = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (userIsAdmin)
    return (
      <Body>
        <div className="flex flex-col space-y-8 lg:space-y-0 lg:grid lg:gap-x-8 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col space-y-8 flex-grow">
            <AddToCatalogForm />
            <RemoveFromCatalogForm />
          </div>
          <CatalogTable />
        </div>
      </Body>
    )

  return (
    <Body>
      <CatalogTable />
    </Body>
  )
}

export default Catalog
