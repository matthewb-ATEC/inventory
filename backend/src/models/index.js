import Material from './material.js'
import Stock from './stock.js'
import Project from './project.js'

const defineRelationships = () => {
  Material.hasMany(Stock, { foreignKey: 'materialId', as: 'stocks' })
  Stock.belongsTo(Material, { foreignKey: 'materialId', as: 'material' })

  Project.hasMany(Stock, { foreignKey: 'projectId', as: 'stocks' })
  Stock.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
}

defineRelationships()

export { Material, Stock, Project }
