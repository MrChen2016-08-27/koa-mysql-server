const Sequelize = require('sequelize')
const mysqlORM = require('../dao/index')

const Role = mysqlORM.define('role', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    authority: {
        type: Sequelize.STRING
    }
})

module.exports = Role
