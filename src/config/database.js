// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
      // Create the collumns "created_at" and "updated_at"
      timestamps: true,
      // Utilizes the standard of tables names with underscore
      underscored: true,
      // Utilizes the standard of collumns names and relationships with underscore
      underscoredAll: true
    }
  },
  test: {
    username: 'postgres',
    password: 'docker',
    database: 'tdd',
    host: 'localhost',
    dialect: 'postgres',
    define: {
      // Create the collumns "created_at" and "updated_at"
      timestamps: true,
      // Utilizes the standard of tables names with underscore
      underscored: true,
      // Utilizes the standard of collumns names and relationships with underscore
      underscoredAll: true
    }
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      // Create the collumns "created_at" and "updated_at"
      timestamps: true,
      // Utilizes the standard of tables names with underscore
      underscored: true,
      // Utilizes the standard of collumns names and relationships with underscore
      underscoredAll: true
    }
  }
}
