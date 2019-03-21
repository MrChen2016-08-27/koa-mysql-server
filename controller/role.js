const roleApi = require('../dao/role')
const appRouter = require('./role/menus')

exports.addRole = async (ctx, next) => {
    let params = ctx.request.body
    let role = null
    try {
        role = await roleApi.addRole(params)
    } catch (e) {
        if (e.name == 'SequelizeUniqueConstraintError') {
            throw new ctx.ApiError('role_name_repeat')
        }
    }
    ctx.rest(role)
}

exports.deleteRole = async (ctx, next) => {
    let { id } = ctx.request.body
    if (id == 1) {
        throw new ctx.ApiError('super_admin_not_delete')
    }
    await roleApi.deleteRole(id)
    ctx.rest({})
}

exports.getRoleList = async (ctx, next) => {
    let params = ctx.query
    params.pageNumber = params.pageNumber ? params.pageNumber - 1 : 0
    let result = await roleApi.getRoleList(params)
    ctx.rest({
        list: result.rows,
        count: result.count
    })
}

exports.updateRole = async (ctx, next) => {
    let params = ctx.request.body
    if (params.id == 1) {
        throw new ctx.ApiError('super_admin_not_update')
    }
    if (params.authority) {
        delete params.authority.all
    }
    try {
        await roleApi.updateRole(params)
    } catch (e) {
        if (e.name == 'SequelizeUniqueConstraintError') {
            throw new ctx.ApiError('role_name_repeat')
        }
    }
    ctx.rest({})
}

exports.getRole = async (ctx, next) => {
    let { id } = ctx.query
    let role = await roleApi.getRole(id)
    ctx.rest(role)
}

exports.getAllMenus = async (ctx, next) => {
    ctx.rest(appRouter)
}
