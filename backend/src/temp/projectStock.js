import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
class ProjectStock extends Model {}

ProjectStock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ProjectStock',
    tableName: 'project_stock',
    timestamps: true,
  },
)

export default ProjectStock
