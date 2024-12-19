import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  // Drop tables with CASCADE to handle dependencies
  await queryInterface.sequelize.query(
    'DROP TABLE IF EXISTS "crate_stock" CASCADE;',
  )
  await queryInterface.sequelize.query(
    'DROP TABLE IF EXISTS "shipment_stock" CASCADE;',
  )
  await queryInterface.sequelize.query(
    'DROP TABLE IF EXISTS "request_stock" CASCADE;',
  )
  await queryInterface.sequelize.query('DROP TABLE IF EXISTS "crates" CASCADE;')
  await queryInterface.sequelize.query(
    'DROP TABLE IF EXISTS "locations" CASCADE;',
  )
  await queryInterface.sequelize.query(
    'DROP TABLE IF EXISTS "materials" CASCADE;',
  )

  // Create shipment_status ENUM for PostgreSQL
  await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'shipment_status') THEN
          CREATE TYPE shipment_status AS ENUM (
            'Inbound', 'Outbound', 'Returning', 'In Transit', 'Received'
          );
        END IF;
      END
      $$;
    `)

  // Create tables
  await queryInterface.createTable('locations', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    aisle: DataTypes.INTEGER,
    col: DataTypes.CHAR,
    shelf: DataTypes.INTEGER,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  })

  await queryInterface.createTable('vendors', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
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

  await queryInterface.createTable('materials', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    part_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thickness_inches: DataTypes.FLOAT,
    width_inches: DataTypes.FLOAT,
    length_inches: DataTypes.FLOAT,
    square_feet: DataTypes.FLOAT,
    color: DataTypes.STRING,
    tag: DataTypes.STRING,
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vendors',
        key: 'id',
      },
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

  await queryInterface.addIndex('materials', ['part_number'], {
    unique: true,
    name: 'idx_part_number',
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  })

  await queryInterface.createTable('projects', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    name: {
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

  await queryInterface.createTable('requests', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
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

  await queryInterface.createTable('shipments', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: 'shipment_status',
      allowNull: false,
    },
    origin: DataTypes.INTEGER,
    destination: DataTypes.INTEGER,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  })

  await queryInterface.createTable('stock', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'materials',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
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

  await queryInterface.createTable('crates', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      unique: true,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'locations',
        key: 'id',
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
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

  await queryInterface.createTable('crate_stock', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    crate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'crates',
        key: 'id',
      },
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stock',
        key: 'id',
      },
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

  await queryInterface.createTable('shipment_crate', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shipment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shipments',
        key: 'id',
      },
    },
    crate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'crates',
        key: 'id',
      },
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

  await queryInterface.createTable('request_stock', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'requests',
        key: 'id',
      },
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stock',
        key: 'id',
      },
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

  // Create the trigger to calculate `square_feet` for materials
  await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION calculate_square_feet()
      RETURNS TRIGGER AS $$
      BEGIN
          IF NEW.square_feet IS NULL THEN
              IF NEW.width_inches IS NOT NULL AND NEW.length_inches IS NOT NULL THEN
                  NEW.square_feet := (NEW.width_inches * NEW.length_inches) / 144;
              ELSE
                  NEW.square_feet := NULL;
              END IF;
          END IF;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER set_square_feet
      BEFORE INSERT ON materials
      FOR EACH ROW
      EXECUTE FUNCTION calculate_square_feet();
    `)
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.query(
    'DROP TRIGGER IF EXISTS set_square_feet ON materials',
  )

  // Drop tables in reverse order of dependencies
  await queryInterface.dropTable('request_stock')
  await queryInterface.dropTable('shipment_stock')
  await queryInterface.dropTable('crate_stock')
  await queryInterface.dropTable('crates')
  await queryInterface.dropTable('stock')
  await queryInterface.dropTable('shipments')
  await queryInterface.dropTable('requests')
  await queryInterface.dropTable('projects')
  await queryInterface.dropTable('materials')
  await queryInterface.dropTable('vendors')
  await queryInterface.dropTable('locations')
}
