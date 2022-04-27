'use strict'

import fs from 'fs'
import path from 'path'
import { Sequelize, DataTypes } from 'sequelize'
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(path.resolve(__dirname, '..', '..', 'config', 'database.js'))[env]

const db: any = {}

let sequelize: unknown
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts')
  })
  .forEach((file: any) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
