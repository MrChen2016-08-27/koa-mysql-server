const router = require('koa-router')()
const FileUpload = require('../../controller/fileUpload.js')
const config = require('../../config')
const koaBody = require('koa-body')
const path = require('path')
// const {
//     getMulterUploadExcel,
//     getMulterUploadImg
// } = require('../../tool/upload')

router.prefix('/upload')

router.post(
    '/file',
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: config.file.local,
            // 保持文件后缀
            keepExtensions: true,
            // 文件上传大小, 最大100M
            maxFieldsSize: 100 * 1024 * 1024,
            // 计算文件hash
            hash: 'md5'
        }
    }),
    FileUpload.uploadFile
)
router.post(
    '/img',
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: config.image.local,
            // 保持文件后缀
            keepExtensions: true,
            // 文件上传大小
            maxFieldsSize: 5 * 1024 * 1024,
            // 计算文件hash
            hash: 'md5'
        }
    }),
    FileUpload.uploadImg
)

module.exports = router
