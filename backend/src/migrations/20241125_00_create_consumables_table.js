import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('consumables', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    shelf_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    over_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    available_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    shelf_stock_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    over_stock_location: {
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
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('consumables')
}
