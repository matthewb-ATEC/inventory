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
    shelfStockLocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    overstockLocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'ItemLocation',
  },
)

export default ItemLocation
