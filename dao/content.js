const models = require('../model')
const mysqlORM = require('./index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.getContentList = async ({
    pageNumber = 0,
    pageSize = 10,
    keyword,
    columnId,
    typeId,
    username
}) => {
    keyword = keyword ? `%${keyword}%` : '%%'
    pageNumber = Number(pageNumber)
    pageSize = Number(pageSize)
    let options = {}
    if (columnId) {
        options.columnId = columnId
    }
    if (typeId) {
        options.typeId = typeId
    }
    if (username) {
        options.cuser = username
    }
    return await models.Content.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.like]: keyword
                    }
                },
                {
                    description: {
                        [Op.like]: keyword
                    }
                },
                {
                    content: {
                        [Op.like]: keyword
                    }
                },
                {
                    cuser: {
                        [Op.like]: keyword
                    }
                },
                {
                    muser: {
                        [Op.like]: keyword
                    }
                },
                {
                    keywords: {
                        [Op.like]: keyword
                    }
                }
            ],
            ...options
        },
        offset: pageNumber * pageSize,
        limit: pageSize,
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: models.Review,
                order: [['createdAt', 'DESC']],
                limit: 1,
            }
        ]
    })
}

exports.getReviewContentList = async ({
    pageNumber = 0,
    pageSize = 10,
    keyword,
    columnId,
    typeId,
    username
}) => {
    keyword = keyword ? `%${keyword}%` : '%%'
    pageNumber = Number(pageNumber)
    pageSize = Number(pageSize)
    let options = {}
    if (columnId) {
        options.columnId = columnId
    }
    if (typeId) {
        options.typeId = typeId
    }
    if (username) {
        options.cuser = username
    }
    return await models.Content.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.like]: keyword
                    }
                },
                {
                    description: {
                        [Op.like]: keyword
                    }
                },
                {
                    content: {
                        [Op.like]: keyword
                    }
                },
                {
                    cuser: {
                        [Op.like]: keyword
                    }
                },
                {
                    muser: {
                        [Op.like]: keyword
                    }
                },
                {
                    keywords: {
                        [Op.like]: keyword
                    }
                }
            ],
            ...options
        },
        offset: pageNumber * pageSize,
        limit: pageSize,
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: models.Review,
                order: [['createdAt', 'DESC']],
                limit: 1,
            }
        ]
    })
}

exports.getContent = async (id, username = null) => {
    let content = null
    if (!username) {
        content = await models.Content.findById(id)
    } else {
        content = await models.Content.findOne({ id, cuser: username })
    }
    return content
}

exports.getReviewContent = async (id, username = null) => {
    let result = await models.Content.findOne({
        id,
        include: [
            {
                model: models.Review
            }
        ]
    })
    return result
}

exports.updateContent = async ({
    id,
    title,
    description,
    content,
    sourceType,
    source,
    columnId,
    columnTypeId,
    typeId,
    keywords,
    icon,
    muser,
    username
}) => {
    let options = {}
    if (username) {
        options.cuser = username
    }
    return await models.Content.update(
        {
            title,
            description,
            content,
            sourceType,
            source,
            columnId,
            columnTypeId,
            typeId,
            keywords,
            icon,
            muser
        },
        {
            where: {
                id,
                ...options
            }
        }
    )
}

exports.addContentView = async id => {
    let content = await models.Content.findById(id)
    content.views = Number(content.views) + 1
    content.save()
}

exports.deleteContent = async (id, username = null) => {
    let options = {}
    if (username) {
        options.cuser = username
    }
    return await models.Content.destroy({
        where: {
            id,
            ...options
        }
    })
}

exports.addContent = async ({
    title,
    description,
    content,
    sourceType,
    source,
    columnId,
    columnTypeId,
    typeId,
    keywords,
    icon,
    cuser
}) => {
    return await models.Content.create({
        title,
        description,
        content,
        sourceType,
        source,
        columnId,
        columnTypeId,
        typeId,
        keywords,
        icon,
        cuser
    })
}
