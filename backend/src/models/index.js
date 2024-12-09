import Material from './material.js'
import Stock from './stock.js'

const defineRelationships = () => {
  Material.hasMany(Stock, { foreignKey: 'material_id', as: 'stocks' })
  Stock.belongsTo(Material, { foreignKey: 'material_id', as: 'material' })
}

defineRelationships()

export { Material, Stock }
