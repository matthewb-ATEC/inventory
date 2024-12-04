import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class ItemLocation extends Model {}

ItemLocation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shelfStockLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    overstockLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ItemLocation',
    tableName: 'item_location',
    timestamps: true,
  },
)

export default ItemLocation
