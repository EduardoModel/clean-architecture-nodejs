'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'access_token', {
      type: Sequelize.STRING(1024),
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'access_token')
  }
}
