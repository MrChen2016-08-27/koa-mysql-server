const router = require('koa-router')()
const column = require('../../controller/column')
router.prefix('/column')

router.post('/add', column.addColumn)
router.get('/list', column.getColumnList)
router.get('/get', column.getColumn)
router.post('/delete', column.deleteColumn)
router.post('/update', column.updateColumn)

module.exports = router
