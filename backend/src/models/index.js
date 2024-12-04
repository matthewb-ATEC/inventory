import Item from './item.js'
import Stock from './stock.js'

const defineRelationships = () => {
  Item.hasOne(Stock, { foreignKey: 'itemId', as: 'item' })
  Stock.belongsTo(Item, { foreignKey: 'itemId', as: 'item' })
}

defineRelationships()

export { Item, Stock }
