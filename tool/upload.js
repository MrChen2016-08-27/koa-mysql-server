const multer = require('koa-multer')
const fs = require('fs')
const path = require('path')
const config = require('../config')
const ApiError = require('../config/ApiError')
const moment = require('moment')
const crypto = require('crypto')

exports.getMulterUploadExcel = function() {
    const storage = multer.diskStorage({
        //文件保存路径
        destination: function(req, file, cb) {
            cb(null, config.file.local)
        },
        //修改文件名称
        filename: function(req, file, cb) {
            var fileFormat = file.originalname
            cb(null, fileFormat)
        }
    })
    const fileFilter = function(req, file, cb) {
        const reqPath = path.resolve(config.file.local, file.originalname)
        const result = fs.existsSync(reqPath)
        if (result) {
            cb(new ApiError('file_exist', '文件已存在'), false)
        } else {
            cb(null, true)
        }
    }
    //加载配置
    const upload = multer({ storage: storage, fileFilter })
    return upload
}
exports.getMulterUploadImg = function() {
    const storage = multer.diskStorage({
        //文件保存路径
        destination: function(req, file, cb) {
            cb(null, config.image.local)
        },
        //修改文件名称
        filename: function(req, file, cb) {
            let filename = file.originalname.substring(
                0,
                file.originalname.lastIndexOf('.')
            )

            if (file.mimetype === 'image/png') {
                filename = `${filename}-${moment().format(
                    'YYYY-MM-DD.HH.mm.ss'
                )}.png`
            } else {
                filename = `${filename}-${moment().format(
                    'YYYY-MM-DD.HH.mm.ss'
                )}.jpg`
            }
            cb(null, filename)
        }
    })
    const fileFilter = function(req, file, cb) {
        if (/image/g.test(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new ApiError('img_error', '格式错误'), false)
        }
    }
    //加载配置
    const upload = multer({ storage: storage, fileFilter })
    return upload
}
