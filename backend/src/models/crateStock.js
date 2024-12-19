import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class CrateStock extends Model {}

CrateStock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    crateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'crates', key: 'id' },
    },
    stockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'stock', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'crateStock',
    tableName: 'crate_stock',
  },
)

export default CrateStock
