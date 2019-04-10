const _ = require('lodash')
const config = require('../config')
const fs = require('fs')
const path = require('path')

/**
 *
 */
exports.uploadFile = async (ctx, next) => {
    let filename = ctx.request.files.file.path
    filename = filename.substring(filename.lastIndexOf('\\') + 1)
    let path = `${config.file.wwww}/${filename}`
    ctx.rest({
        fileName: path
    })
}

// exports.uploadImg = async (ctx, next) => {
//     let filename = ctx.req.file.filename
//     let path = `${config.image.wwww}/${filename}`
//     ctx.rest({
//         fileName: path
//     })
// }

exports.uploadImg = async (ctx, next) => {
    let filename = ctx.request.files.file.path
    filename = filename.substring(filename.lastIndexOf('\\') + 1)
    let path = `${config.image.wwww}/${filename}`
    ctx.rest({
        fileName: path
    })
}
