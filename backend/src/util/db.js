import Sequelize from 'sequelize'
import { DATABASE_URI } from './config.js'
import { Umzug, SequelizeStorage } from 'umzug'
import { info, error } from './logger.js'

export const sequelize = new Sequelize(DATABASE_URI)

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    info('connected to the database')
  } catch (err) {
    error(err)
    error('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

const migrationConf = {
  migrations: {
    glob: 'src/migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  info('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

export const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}
