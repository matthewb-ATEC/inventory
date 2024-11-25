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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: 0,
          msg: 'Quantity cannot be negative',
        },
        isInt: {
          msg: 'Quantity must be an integer',
        },
      },
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
