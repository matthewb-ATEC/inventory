import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
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
    projectId: {
      type: DataTypes.INTEGER,
      references: { model: 'projects', key: 'id' },
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
