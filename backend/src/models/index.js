import Material from './material.js'
import Stock from './stock.js'

const defineRelationships = () => {
  Material.hasOne(Stock, { foreignKey: 'materialId', as: 'material' })
  Stock.belongsTo(Material, { foreignKey: 'materialId', as: 'material' })
}

defineRelationships()

export { Material, Stock }
