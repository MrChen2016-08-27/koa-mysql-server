const columnApi = require('../dao/column')

exports.getColumnList = async (ctx, next) => {
    let params = ctx.query
    params.pageNumber = params.pageNumber ? params.pageNumber - 1 : 0
    let result = await columnApi.getColumnList(params)
    ctx.rest({
        list: result.rows,
        count: result.count
    })
}

exports.getColumn = async (ctx, next) => {
    let { id } = ctx.query
    let column = await columnApi.getColumn(id)
    ctx.rest(column)
}

exports.updateColumn = async (ctx, next) => {
    let params = ctx.request.body
    const { username } = ctx.state.user.data
    params.cuser = username
    try {
        await columnApi.updateColumn(params)
    } catch (e) {
        if (e.name == 'SequelizeUniqueConstraintError') {
            throw new ctx.ApiError('column_name_repeat')
        }
    }
    ctx.rest(null)
}

exports.addColumn = async (ctx, next) => {
    let params = ctx.request.body
    const { username } = ctx.state.user.data
    params.cuser = username
    let column = null
    try {
        column = await columnApi.addColumn(params)
    } catch (e) {
        if (e.name == 'SequelizeUniqueConstraintError') {
            throw new ctx.ApiError('column_name_repeat')
        }
    }
    ctx.rest(column)
}

exports.deleteColumn = async (ctx, next) => {
    let { id } = ctx.request.body
    await columnApi.deleteColumn(id)
    ctx.rest(null)
}
