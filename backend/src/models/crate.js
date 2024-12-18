import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class Crate extends Model {}

Crate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      unique: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'locations', key: 'id' },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'projects', key: 'id' },
    },
  },
  { sequelize, underscored: true, timestamps: true, modelName: 'crate' },
)

export default Crate
