import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('stocks', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'materials', key: 'id' },
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: { model: 'projects', key: 'id' },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  })

  await queryInterface.addIndex('stocks', ['material_id', 'project_id'], {
    name: 'idx_material_project',
  })
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeIndex('stocks', 'idx_material_project')

  await queryInterface.dropTable('stocks')
}
