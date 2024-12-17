import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class Request extends Model {}

Request.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'projects', key: 'id' },
    },
  },
  { sequelize, underscored: true, timestamps: true, modelName: 'request' },
)

export default Request
