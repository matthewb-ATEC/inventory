import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class RequestStock extends Model {}

RequestStock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'requests', key: 'id' },
    },
    stockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'stock', key: 'id' },
    },
  },
  { sequelize, underscored: true, timestamps: true, modelName: 'requestStock' },
)

export default RequestStock
