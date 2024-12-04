import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    aisle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shelf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'Location',
  },
)

export default Location
