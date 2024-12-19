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
    aisle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.CHAR,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    shelf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, underscored: true, timestamps: true, modelName: 'location' },
)

// Add a hook to capitalize all letters
Location.addHook('beforeSave', (instance) => {
  if (instance.col) {
    instance.col = instance.col.toUpperCase() // Capitalize all letters
  }
})

export default Location
