import Material from './material.js'
import Stock from './stock.js'
import Project from './project.js'
import Vendor from './vendor.js'
import Location from './location.js'
import Crate from './crate.js'
import CrateStock from './crateStock.js'
import Shipment from './shipment.js'
import ShipmentCrate from './shipmentCrate.js'
import Request from './request.js'
import RequestStock from './requestStock.js'

// Define relationships
const defineRelationships = () => {
  // Material to Stock relationship
  Material.hasMany(Stock, { foreignKey: 'materialId', as: 'stock' })
  Stock.belongsTo(Material, { foreignKey: 'materialId', as: 'material' })

  Vendor.hasMany(Material, { foreignKey: 'vendorId', as: 'material' })
  Material.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' })

  // Crate to Location relationship
  Crate.belongsTo(Location, { foreignKey: 'locationId', as: 'location' })
  Location.hasMany(Crate, { foreignKey: 'locationId', as: 'crates' })

  // Crate to Project relationship
  Crate.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
  Project.hasMany(Crate, { foreignKey: 'projectId', as: 'crates' })

  // Shipment to Project relationship
  Shipment.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
  Project.hasMany(Shipment, { foreignKey: 'projectId', as: 'shipments' })

  // Shipment to Vendor relationship
  Shipment.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' })
  Vendor.hasMany(Shipment, { foreignKey: 'vendorId', as: 'shipments' })

  // CrateStock to Crate relationship
  CrateStock.belongsTo(Crate, { foreignKey: 'crateId', as: 'crate' })
  Crate.hasMany(CrateStock, { foreignKey: 'crateId', as: 'crateStocks' })

  // CrateStock to Stock relationship
  CrateStock.belongsTo(Stock, { foreignKey: 'stockId', as: 'stock' })
  Stock.hasMany(CrateStock, { foreignKey: 'stockId', as: 'crateStocks' })

  // ShipmentCrate to Shipment relationship
  ShipmentCrate.belongsTo(Shipment, {
    foreignKey: 'shipmentId',
    as: 'shipment',
  })
  Shipment.hasMany(ShipmentCrate, {
    foreignKey: 'shipmentId',
    as: 'shipmentCrates',
  })

  // ShipmentCrate to Crate relationship
  ShipmentCrate.belongsTo(Crate, { foreignKey: 'crateId', as: 'crate' })
  Crate.hasMany(ShipmentCrate, { foreignKey: 'crateId', as: 'shipmentCrates' })

  // RequestStock to Request relationship
  RequestStock.belongsTo(Request, { foreignKey: 'requestId', as: 'request' })
  Request.hasMany(RequestStock, {
    foreignKey: 'requestId',
    as: 'requestStocks',
  })

  // RequestStock to Stock relationship
  RequestStock.belongsTo(Stock, { foreignKey: 'stockId', as: 'stock' })
  Stock.hasMany(RequestStock, { foreignKey: 'stockId', as: 'requestStocks' })
}

defineRelationships()

export {
  Material,
  Stock,
  Project,
  Vendor,
  Location,
  Crate,
  CrateStock,
  Shipment,
  ShipmentCrate,
  Request,
  RequestStock,
}
