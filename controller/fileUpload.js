const _ = require('lodash')
const config = require('../config')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

/**
 *
 */
exports.uploadFile = async (ctx, next) => {
    let originalname = ctx.req.file.originalname
    let path = `${config.file.wwww}/${originalname}`
    ctx.rest({
        fileName: path
    })
}

exports.uploadImg = async (ctx, next) => {
    let filename = ctx.req.file.filename
    let path = `${config.image.wwww}/${filename}`
    ctx.rest({
        fileName: path
    })
}
