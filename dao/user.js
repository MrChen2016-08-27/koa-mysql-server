const models = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const redisTool = require('../tool/redis_tool')
const redis = require('../tool/redis')

// 获取用户信息
exports.getUser = async where => {
    let user = await models.User.findOne({
        where,
        attributes: { exclude: ['password'] }
    })
    return user
}

// 添加用户
exports.addUser = async (
    {
        username,
        nickname,
        password,
        gender,
        birth,
        experience,
        mobile,
        email,
        other_code,
        address,
        code
    },
    opt
) => {
    let user = await models.User.create(
        {
            username,
            nickname,
            password,
            gender,
            birth,
            experience,
            mobile,
            email,
            other_code,
            address,
            code
        },
        opt
    )
    return user
}

// 给指定用户添加角色
exports.addUserRole = async (userId, roleIds) => {
    let user = await models.User.findById(userId)
    if (!roleIds || roleIds.length <= 0) {
        return user;
    }
    let roles = await models.Role.findAll({
        where: {
            id: {
                [Op.or]: roleIds
            }
        }
    })
    let userRoles = await user.setRoles(roles)
    return userRoles
}

// 修改用户角色
exports.updateUserRole = async (userId, roleIds) => {
    let user = await models.User.findById(userId)
    if (!roleIds) {
        return;
    }
    await redisTool.delete(`user_auth_${userId}`)
    await user.setRoles([])
    if (roleIds.length <= 0) {
        return;
    }
    let roles = await models.Role.findAll({
        where: {
            id: {
                [Op.or]: roleIds
            }
        }
    })
    await user.setRoles(roles)
    // 防止删除后执行sql未完成时请求的缓存
    let exitAuth = await redisTool.get(`user_auth_${userId}`)
    if (exitAuth) {
        redisTool.delete(`user_auth_${userId}`)
    }
}

// 修改用户信息(非关键信息)
exports.updateUser = async user => {
    return await models.User.update(user, {
        where: {
            id: user.id
        },
        attributes: { exclude: ['password'] }
    })
}

// 获取用户信息和对应角色信息
exports.getUserRole = async userId => {
    let userRole = await models.User.findOne({
        where: {
            id: userId
        },
        attributes: { exclude: ['password'] },
        include: [
            {
                model: models.Role,
                through: {
                    where: {
                        userId
                    }
                }
            }
        ]
    })
    return userRole
}

// 删除用户信息
exports.deleteUser = async id => {
    await models.User.destroy({
        where: {
            id
        }
    })
}

// 获取用户列表(包含拥有角色）
exports.getUserList = async ({ pageNumber = 0, pageSize = 10, keyword }) => {
    keyword = keyword ? `%${keyword}%` : '%%'
    pageNumber = Number(pageNumber)
    pageSize = Number(pageSize)
    return models.User.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    username: {
                        [Op.like]: keyword
                    }
                },
                {
                    mobile: {
                        [Op.like]: keyword
                    }
                }
            ]
        },
        attributes: { exclude: ['password'] },
        include: [
            {
                model: models.Role
            }
        ],
        offset: pageNumber * pageSize,
        limit: pageSize,
        order: [['createdAt', 'DESC']],
        distinct: true
    })
}
