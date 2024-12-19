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
    status: {
      type: DataTypes.ENUM('Received', 'In Transit', 'Returning'),
      allowNull: false,
    },
    origin: DataTypes.INTEGER,
    destination: DataTypes.INTEGER,
  },
  { sequelize, underscored: true, timestamps: true, modelName: 'shipment' },
)

export default Shipment
