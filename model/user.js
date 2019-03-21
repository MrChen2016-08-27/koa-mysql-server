const Sequelize = require('sequelize')
const mysqlORM = require('../dao/index')
const Code = require('./code')

const User = mysqlORM.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 16],
                msg: '密码长度在6-16位之间'
            }
        }
    },
    nickname: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [1, 16],
                msg: '昵称长度在1-16位以内'
            }
        }
    },
    gender: {
        type: Sequelize.INTEGER
    },
    // 出生年月
    birth: {
        type: Sequelize.DATE
    },
    // 经验
    experience: {
        type: Sequelize.STRING
    },
    mobile: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isNumeric: {
                msg: '请输入正确的手机号码'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: {
                msg: '请输入正确格式的邮箱地址'
            }
        }
    },
    // 地址
    address: {
        type: Sequelize.STRING
    },
    // 受邀码
    other_code: {
        type: Sequelize.STRING
    },
    // 邀请码
    code: {
        type: Sequelize.STRING,
        unique: true
    }
})

module.exports = User
