const router = require('koa-router')();
const FileUpload = require('../../controller/fileUpload.js');
const { getMulterUploadExcel, getMulterUploadImg } = require('../../tool/upload');

router.prefix('/upload');


router.post('/file', getMulterUploadExcel().single('file'), FileUpload.uploadFile);
router.post('/img', getMulterUploadImg().single('file'), FileUpload.uploadImg);

module.exports = router;