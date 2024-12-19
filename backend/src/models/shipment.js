import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class Shipment extends Model {}

Shipment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('Vendor to Warehouse', 'Warehouse to Project'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Received', 'Shipped'),
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: { model: 'projects', key: 'id' },
      allowNull: false,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      references: { model: 'vendors', key: 'id' },
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'shipment',
  },
)

export default Shipment
