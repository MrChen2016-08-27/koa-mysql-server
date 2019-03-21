const models = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.getColumnList = async ({ pageNumber = 0, pageSize = 10, keyword }) => {
    keyword = keyword ? `%${keyword}%` : '%%'
    pageNumber = Number(pageNumber)
    pageSize = Number(pageSize)
    return await models.Column.findAndCountAll({
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

exports.getColumn = async id => {
    let column = await models.Column.findById(id)
    return column
}

exports.updateColumn = async ({ id, name, cuser }) => {
    return await models.Column.update(
        {
            name,
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

exports.addColumn = async ({ name, cuser }) => {
    return await models.Column.create({
        name,
        cuser
    })
}
