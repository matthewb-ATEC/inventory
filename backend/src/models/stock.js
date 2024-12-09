import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Material from './material.js'
class Stock extends Model {}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'materials', key: 'id' },
    },
    project: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'stock',
  },
)

export default Stock
