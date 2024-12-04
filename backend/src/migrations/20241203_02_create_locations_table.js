import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('locations', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    aisle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shelf: {
      type: DataTypes.STRING,
      allowNull: false,
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

  await queryInterface.addConstraint('locations', {
    fields: ['aisle', 'shelf'],
    type: 'unique',
    name: 'unique_aisle_shelf',
  })
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeConstraint('locations', 'unique_aisle_shelf')

  await queryInterface.dropTable('locations')
}
