const models = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.getColumnList = async ({
    pageNumber = 0,
    pageSize = 10,
    keyword,
    moduleId
}) => {
    keyword = keyword ? `%${keyword}%` : '%%'
    pageNumber = Number(pageNumber)
    pageSize = Number(pageSize)
    let whereOptions = {}
    if (moduleId) {
        whereOptions.moduleId = moduleId
    }
    return await models.Column.findAndCountAll({
        where: {
            name: {
                [Op.like]: keyword
            },
            ...whereOptions
        },
        offset: pageNumber * pageSize,
        limit: pageSize,
        order: [['createdAt', 'DESC']]
    })
}

exports.getColumn = async id => {
    let column = await models.Column.findById(id)
    return column
}

exports.updateColumn = async ({ id, name, moduleId, cuser }) => {
    return await models.Column.update(
        {
            name,
            moduleId,
            cuser
        },
        {
            where: {
                id
            }
        }
    )
}

exports.deleteColumn = async id => {
    return await models.Column.destroy({
        where: {
            id
        }
    })
}

exports.addColumn = async ({ name, moduleId, cuser }) => {
    return await models.Column.create({
        name,
        moduleId,
        cuser
    })
}
