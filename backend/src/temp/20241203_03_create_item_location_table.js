import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('item_location', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'item', key: 'id' },
      onDelete: 'CASCADE',
    },
    shelf_stock_location: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'location', key: 'id' },
      onDelete: 'CASCADE',
    },
    overstock_location: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'location', key: 'id' },
      onDelete: 'CASCADE',
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
  await queryInterface.dropTable('item_location')
}
