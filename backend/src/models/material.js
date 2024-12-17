import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class Material extends Model {}

Material.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    partNumber: { type: DataTypes.STRING, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
    thicknessInches: DataTypes.FLOAT,
    widthInches: DataTypes.FLOAT,
    lengthInches: DataTypes.FLOAT,
    squareFeet: DataTypes.FLOAT,
    color: DataTypes.STRING,
    tag: DataTypes.STRING,
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'vendors', key: 'id' },
    },
  },
  { sequelize, underscored: true, timestamps: true, modelName: 'material' },
)

export default Material
