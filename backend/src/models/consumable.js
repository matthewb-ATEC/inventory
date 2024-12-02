import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class Consumable extends Model {}

Consumable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    availableStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    shelfStockLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overStockLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'consumable',
  },
)

export default Consumable
