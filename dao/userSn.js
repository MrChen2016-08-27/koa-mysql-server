const models = require('../model')

exports.addSN = async sn => {
    let result = await models.UserSn.create({
        sn
    })
    return result.sn
}

exports.getSN = async () => {
    return await models.UserSn.findOne({
        where: {
            userId: {
                $eq: null
            }
        }
    })
}

exports.updateSN = async (sn, userId, opt) => {
    return await models.UserSn.update(
        {
            userId
        },
        {
            where: {
                sn: {
                    $eq: sn
                }
            },
            ...opt
        }
    )
}
