const jwt = require('jsonwebtoken')
const config = require('../config')
const Rsa = require('../tool/rsa')
const mysqlORM = require('../dao/index')
const userApi = require('../dao/user')
const roleApi = require('../dao/role')
const codeApi = require('../dao/code')
const userSnApi = require('../dao/userSn')
const moment = require('moment')
const { appRouter } = require('./role/menus')
const _lang = require('lodash/lang')
const redisTool = require('../tool/redis_tool')
const redis = require('../tool/redis')

function filterAuthMenus(authObj, list) {
    let results = []
    for (let i in authObj) {
        let nowObj = list.find(item => item.id == i)
        nowObj = _lang.cloneDeep(nowObj)
        if (typeof authObj[i] == 'object' && authObj[i] != null) {
            nowObj.children = filterAuthMenus(authObj[i], nowObj.children)
            if (nowObj.children.length > 0) {
                results.push(nowObj)
            }
        } else if (authObj[i] > 0) {
            results.push(nowObj)
        }
    }
    return results
}

function sortMenus(authMenus, localMenus) {
    let results = []
    localMenus.forEach((item) => {
        let result = authMenus.find(item2 => item2.id == item.id)
        if (result) {
            result = _lang.cloneDeep(result)
            if (result.children) {
                result.children = sortMenus(result.children, item.children)
            }
            results.push(result)
        }
    });
    return results
}

// exports.login = async (ctx, next) => {
//     let { username, password } = ctx.request.body;
//     password = Rsa.decrypKey(ctx.session, password);
//     const res = await userApi.login({username, password});
//     ctx.session.user = {
//         username
//     };
//     ctx.rest(res.data);
//     // 模拟
//     // if (userName === 'admin' && passWord === 'admin') {
//     //     ctx.session.user = {
//     //         userName,
//     //     };
//     //     ctx.rest({
//     //         message: '登录成功'
//     //     });
//     // } else {
//     //     throw new ctx.ApiError('user_not_exist');
//     // }
// }

// 注册
exports.register = async (ctx, next) => {
    let roleId = 3
    let { nickname, password, mobile, email, other_code } = ctx.request.body
    const params = {
        nickname,
        password,
        mobile,
        email,
        other_code
    }
    let user = await registerUser(params, false, ctx)
    await userApi.addUserRole(user.id, [roleId])
    ctx.rest(user)
}

// 登录
exports.login = async (ctx, next) => {
    let { mobile, password } = ctx.request.body
    // password = Rsa.decrypKey(ctx.session, password)
    if (!mobile || !password) {
        throw new ctx.ApiError('info_format_error')
    }
    let user = await userApi.getUser({ mobile, password })
    if (!user) {
        throw new ctx.ApiError('login_info_error')
    }
    let result = await userApi.getUserRole(user.id)
    result.authority = getRolesMaxAuth(result.roles)
    const uData = {
        id: result.id,
        mobile: result.mobile,
        username: result.username,
    }
    // 权限存到redis中对应用户id
    await this.setUserAuth(result.id, JSON.stringify(result.authority))
    ctx.rest({
        token: jwt.sign({ data: uData }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn
        }),
        user: result
    })
}

/**
 *
 * @param {Object} params 用户信息
 * @param {Boolean} params 是否给用户绑定一个邀请码
 * @param {Object} ctx
 */
async function registerUser(params, isCode = false, ctx) {
    if (!params.mobile) {
        throw new ctx.ApiError('mobile_not_null')
    }
    let mobileRep = /^\d{11}$/g
    if (!mobileRep.test(params.mobile)) {
        throw new ctx.ApiError('mobile_format_error')
    }
    const userId = await userApi.getUser({
        mobile: params.mobile
    })
    if (userId) {
        throw new ctx.ApiError('user_repeat')
    }
    let user = null

    try {
        await mysqlORM.transaction(async function(t) {
            if (isCode) {
                const { code } = await codeApi.getCode()
                params.code = code
            }
            // 获取唯一编号
            const { sn } = await userSnApi.getSN()
            params.username = sn
            user = await userApi.addUser(params, { transaction: t })

            // 绑定编号
            await userSnApi.updateSN(sn, user.id, {
                transaction: t
            })

            if (isCode) {
                // 绑定邀请码
                await codeApi.updateCode(params.code, user.id, {
                    transaction: t
                })
            }
            // await userApi.addUserRole(user.id, roleIds)
        })
    } catch (e) {
        throw e
    }
    delete user.password
    return user
}

exports.getKey = async (ctx, next) => {
    Rsa.initClientKey(ctx.session)
    ctx.rest({
        key: Rsa.getKey(ctx.session)
    })
}

// 获得计算拥有的角色集合的在最大权限
function getRolesMaxAuth(roleList) {
    let result = {}
    let list = roleList.map(item => JSON.parse(item.authority))
    list.map(obj => {
        for (let key in obj) {
            if (typeof obj[key] !== 'object') {
                result[key] = obj[key]
                continue
            }
            if (!result[key]) {
                result[key] = _lang.cloneDeep(obj[key])
                continue
            }
            for (let key2 in obj[key]) {
                if (!result[key][key2]) {
                    result[key][key2] = _lang.cloneDeep(obj[key][key2])
                    continue
                }
                let num = 0
                // 对每一项增删改查的权限进行合并
                for (let i = 0; i < config.apiKeys.length; i++) {
                    let e = 1 << i
                    let a = obj[key][key2] & e
                    let b = result[key][key2] & e
                    if (a || b) {
                        num += Math.pow(2, i)
                    }
                }
                result[key][key2] = num
            }
        }
    })
    return result
}

exports.getTokenUser = async (ctx, next) => {
    const userInfo = ctx.state.user
    // 查询redis中用户对应权限
    let authority = await this.getUserAuth(userInfo.data.id)
    let menus = null
    // 如果all字段为true，则放行所有权限
    if (authority.all) {
        menus = appRouter
    } else {
        // 过滤出权限菜单
        menus = filterAuthMenus(authority, appRouter)
        // 按照配置菜单重新排序
        menus = sortMenus(menus, appRouter)
    }
    ctx.rest({
        ...userInfo.data,
        menus
    })
}

exports.getRoleMenus = async (ctx, next) => {
    let { id } = ctx.query
    ctx.rest({
        list: appRouter,
        rights: {}
    })
}

// 后台增加用户，可自选多个角色
exports.addUser = async (ctx, next) => {
    let params = ctx.request.body
    // 角色id列表
    let { roleIds } = params
    let user = await registerUser(params, params.isCode, ctx)
    await userApi.addUserRole(user.id, roleIds)
    let result = await userApi.getUserRole(user.id)
    ctx.rest(result)
}

// 获取用户信息同时返回对应角色信息
exports.getUser = async (ctx, next) => {
    let { id } = ctx.query
    let result = await userApi.getUserRole(id)
    ctx.rest(result)
}

// 用户修改自己信息
exports.updateUser = async (ctx, next) => {
    let { nickname, gender, birth, address } = ctx.request.body
    let user = await userApi.updateUser({ nickname, gender, birth, address })
    ctx.rest({})
}

// 后台修改用户信息和权限
exports.updateUserAndRole = async (ctx, next) => {
    let params = ctx.request.body
    let { id, nickname, gender, birth, experience, email, address } = params
    let roleIds = params.roleIds
    await userApi.updateUser({
        id,
        nickname,
        gender,
        birth,
        experience,
        email,
        address
    })
    await userApi.updateUserRole(params.id, roleIds)
    let result = await userApi.getUserRole(params.id)
    ctx.rest(result)
}

exports.deleteUser = async (ctx, next) => {
    let { id } = ctx.request.body
    await userApi.deleteUser(id)
    ctx.rest({})
}

exports.getUserList = async (ctx, next) => {
    let params = ctx.query
    params.pageNumber = params.pageNumber ? params.pageNumber - 1 : 0
    params.pageSize = params.pageSize
    let result = await userApi.getUserList(params)
    ctx.rest({
        list: result.rows,
        count: result.count
    })
}

exports.getUserAuth = async (userId) => {
    let userAuth = await redisTool.get('user_auth')
    if (!userAuth) {
        userAuth = {}
    } else {
        userAuth = JSON.parse(userAuth)
    }
    let authority = null
    if (!userAuth[userId]) {
        let result = await userApi.getUserRole(userId)
        authority = getRolesMaxAuth(result.roles)
        userAuth[userId] = JSON.stringify(authority)
        redisTool.setPermanent('user_auth', userAuth)
    } else {
        authority = JSON.parse(userAuth[userId])
    }
    return authority
}

exports.setUserAuth = async (userId, authority) => {
    let userAuth = await redisTool.get('user_auth')
    userAuth = JSON.parse(userAuth)
    userAuth[userId] = authority
    await redisTool.setPermanent('user_auth', userAuth)
}
