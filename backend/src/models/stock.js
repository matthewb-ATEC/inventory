import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class Stock extends Model {}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'items', key: 'id' },
    },
    totalStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    shelfStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    overStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'Stock',
  },
)

export default Stock
