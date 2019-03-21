const models = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.addRole = async ({ name, authority = {} }) => {
    if (authority && typeof authority == 'object') {
        authority = JSON.stringify(authority)
    }
    let result = await models.Role.create({
        name,
        authority
    })
    result.authority = JSON.parse(result.authority)
    return result
}

exports.getRole = async id => {
    let role = await models.Role.findById(id)
    role.authority = JSON.parse(role.authority)
    return role
}

exports.deleteRole = async id => {
    return models.Role.destroy({
        where: {
            id
        }
    })
}

exports.getRoleList = async ({ pageNumber = 0, pageSize = 10, keyword }) => {
    keyword = keyword ? `%${keyword}%` : '%%'
    pageNumber = Number(pageNumber)
    pageSize = Number(pageSize)
    return models.Role.findAndCountAll({
        where: {
            name: {
                [Op.like]: keyword
            }
        },
        offset: pageNumber * pageSize,
        limit: pageSize
    })
}

exports.updateRole = async ({ id, name, authority = {} }) => {
    if (authority && typeof authority == 'object') {
        authority = JSON.stringify(authority)
    }
    return models.Role.update(
        {
            name,
            authority
        },
        {
            where: {
                id
            }
        }
    )
}
