import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    aisle: DataTypes.INTEGER,
    col: DataTypes.CHAR,
    shelf: DataTypes.INTEGER,
  },
  { sequelize, underscored: true, timestamps: true, modelName: 'location' },
)

export default Location
