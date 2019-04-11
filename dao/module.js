const models = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.getModuleList = async ({ pageNumber = 0, pageSize = 10, keyword }) => {
    keyword = keyword ? `%${keyword}%` : '%%'
    pageNumber = Number(pageNumber)
    pageSize = Number(pageSize)
    return await models.Module.findAndCountAll({
        where: {
            name: {
                [Op.like]: keyword
            }
        },
        offset: pageNumber * pageSize,
        limit: pageSize,
        order: [['createdAt', 'DESC']]
    })
}

exports.getModule = async id => {
    let result = await models.Module.findById(id)
    return result
}

exports.updateModule = async ({ id, name, cuser, mark }) => {
    return await models.Module.update(
        {
            name,
            cuser,
            mark
        },
        {
            where: {
                id
            }
        }
    )
}

exports.deleteModule = async id => {
    return await models.Module.destroy({
        where: {
            id
        }
    })
}

exports.addModule = async ({ name, cuser, mark }) => {
    return await models.Module.create({
        name,
        cuser,
        mark
    })
}
