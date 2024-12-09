import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class Material extends Model {}

Material.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    partNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    partDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'Material',
  },
)

export default Material
