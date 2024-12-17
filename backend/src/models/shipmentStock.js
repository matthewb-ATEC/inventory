import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class ShipmentStock extends Model {}

ShipmentStock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'shipments', key: 'id' },
    },
    stockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'stock', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'shipmentStock',
  },
)

export default ShipmentStock
