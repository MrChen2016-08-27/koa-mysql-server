const router = require('koa-router')()
const User = require('../../controller/user')
router.prefix('/user')

router.get('/getKey', User.getKey)
router.get('/get', User.getUser)

router.post('/register', User.register)
router.post('/add', User.addUser)
router.post('/update', User.updateUser)
router.post('/admin/update', User.updateUserAndRole)
router.post('/delete', User.deleteUser)
router.get('/list', User.getUserList)
router.post('/login', User.login)
router.get('/parse/token', User.getTokenUser)

module.exports = router
