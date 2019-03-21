const Sequelize = require('sequelize')
const mysqlORM = require('../dao/index')
const User = require('./user')
const Role = require('./role')

const UserRole = mysqlORM.define('userRole', {})
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' })
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' })

module.exports = UserRole
