import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class Vendor extends Model {}

Vendor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, underscored: true, timestamps: true, modelName: 'vendor' },
)

export default Vendor
