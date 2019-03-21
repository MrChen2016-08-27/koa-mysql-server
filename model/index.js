const User = require('./user')
const Role = require('./role')
const Code = require('./code')
const UserRole = require('./userRole')
const UserSn = require('./userSn')
const Column = require('./column')
const Type = require('./type')
const Content = require('./content')

User.hasOne(Code, { foreignKey: 'userId', sourceKey: 'id' })

User.hasOne(UserSn, { foreignKey: 'userId', sourceKey: 'id' })

User.hasMany(Column, { foreignKey: 'cuser', sourceKey: 'username' })
Column.belongsTo(User, { foreignKey: 'cuser', targetkey: 'username' })

User.hasMany(Type, { foreignKey: 'cuser', sourceKey: 'username' })
Type.belongsTo(User, { foreignKey: 'cuser', targetkey: 'username' })

Column.hasMany(Type, { foreignKey: 'columnId', sourceKey: 'id' })
Type.belongsTo(Column, { foreignKey: 'columnId', targetkey: 'id' })

User.hasMany(Content, { foreignKey: 'cuser', sourceKey: 'username' })
Content.belongsTo(User, { foreignKey: 'cuser', targetkey: 'username' })
User.hasMany(Content, { foreignKey: 'muser', sourceKey: 'username' })
Content.belongsTo(User, { foreignKey: 'muser', targetkey: 'username' })

Column.hasMany(Content, { foreignKey: 'columnId', sourceKey: 'id' })
Content.belongsTo(Column, { foreignKey: 'columnId', targetkey: 'id' })

Type.hasMany(Content, { foreignKey: 'typeId', sourceKey: 'id' })
Content.belongsTo(Type, { foreignKey: 'typeId', targetkey: 'id' })

User.sync()
Role.sync()
Code.sync()
UserRole.sync()
UserSn.sync()
Column.sync()
Type.sync()
Content.sync()

module.exports = {
    User,
    Role,
    Code,
    UserRole,
    UserSn,
    Column,
    Type,
    Content
}
