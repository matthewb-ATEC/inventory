import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import itemsService from '../../services/itemsService'
import { ItemLocationType, ItemType } from '../../types'
import Loading from '../Loading'
// Style
import Body from '../Body'
import Container from '../Container'
import { Subtitle, Text, Title } from '../Text'

const ItemDetails = () => {
  const { id } = useParams()
  const [item, setItem] = useState<ItemType>()

  useEffect(() => {
    const getItem = async () => {
      if (!id) return

      const response = await itemsService.getId(id)
      setItem(response)
    }

    void getItem()
  }, [id])

  if (!item) {
    return <Loading />
  }

  return (
    <Body>
      <Container>
        <Title text={item.name} />
        <Subtitle text={item.sku} />
        <Text text={item.type} />
        <Text text={item.category} />
        <ItemStockTable item={item} />
        <ItemLocationTable item={item} />
      </Container>
    </Body>
  )
}

export default ItemDetails

import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'
import stockService from '../../services/stockService'
import { StockType } from '../../types'

const columnHelper = createColumnHelper<StockType>()

const columns = [
  {
    header: 'Stock',
    columns: [
      columnHelper.accessor('totalStock', {
        header: () => 'Total',
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('shelfStock', {
        header: () => 'On Shelf',
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor('overStock', {
        header: () => 'Overstock',
        cell: (info) => info.renderValue(),
      }),
    ],
  },
]

interface ItemStockTableProps {
  item: ItemType
}

const ItemStockTable = ({ item }: ItemStockTableProps) => {
  const [stock, setStock] = useState<StockType[]>([])

  useEffect(() => {
    const getStock = async (): Promise<void> => {
      try {
        const response = await stockService.getItemStock(item.id)
        const stockArray = Array.isArray(response) ? response : [response]
        setStock(stockArray)
      } catch (error) {
        console.error('Failed to fetch stock:', error)
      }
    }
    void getStock()
  }, [])

  return (
    <div>
      <Table data={stock} columns={columns} search={false} />
    </div>
  )
}

const locationColumnHelper = createColumnHelper<ItemLocationType>()

const locationColumns = [
  {
    header: 'Location',
    columns: [
      locationColumnHelper.accessor('shelfStockLocation', {
        header: () => 'On Shelf',
        cell: (info) => {
          const aisle = info.getValue().aisle
          const shelf = info.getValue().shelf
          return `${aisle} ${shelf}`
        },
      }),
      locationColumnHelper.accessor('overstockLocation', {
        header: () => 'Overstock',
        cell: (info) => {
          const aisle = info.getValue().aisle
          const shelf = info.getValue().shelf
          return `${aisle} ${shelf}`
        },
      }),
    ],
  },
]

interface ItemLocationTableProps {
  item: ItemType
}

const ItemLocationTable = ({ item }: ItemLocationTableProps) => {
  const [location, setlocation] = useState<LocationType[]>([])

  useEffect(() => {
    const getlocation = async (): Promise<void> => {
      try {
        //const response = await locationService.getItemLocation(item.id)
        const response = {
          shelfStockLocation: {
            id: 1,
            aisle: '10',
            shelf: 'A1',
          },
          overstockLocation: {
            id: 1,
            aisle: '11',
            shelf: 'B2',
          },
        }
        const locationArray = Array.isArray(response) ? response : [response]
        setlocation(locationArray)
      } catch (error) {
        console.error('Failed to fetch location:', error)
      }
    }
    void getlocation()
  }, [])

  return (
    <div>
      <Table data={location} columns={locationColumns} search={false} />
    </div>
  )
}
