const userSnApi = require('../dao/userSn')

/**
 * 预添加邀请码
 */
exports.addUserSn = async (ctx, next) => {
    // 位数
    let { snLength } = ctx.request.body
    let resultList = await createUniqueSn(snLength)
    ctx.rest({
        resultList
    })
}

/**
 * @desc 生成唯一的编号列表
 * @param {Number} snLength 编号位数，默认为8位, 可以容纳1亿
 */
async function createUniqueSn(snLength = 8) {
    let resultList = []
    // 得到位数总共组合数量
    const maxRange = Math.pow(10, snLength)
    // 生成位数所有组合
    for (let i = 0; i < maxRange; i++) {
        let maxStrLength = String(maxRange).length
        let nowLength = String(i).length
        let diffLength = Number(maxStrLength) - Number(nowLength)
        let result = ''
        for (let x = 0; x < diffLength; x++) {
            result += '0'
        }
        result += String(i)
        await userSnApi.addSN(result)
        resultList.push(result)
    }
    return resultList
}
