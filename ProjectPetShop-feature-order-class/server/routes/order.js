const router = require('express').Router()
const ctrls = require('../controllers/order')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')



router.post('/', verifyAccessToken, ctrls.createOrder)
router.put('/status/:oid', verifyAccessToken,isAdmin, ctrls.updateStatusOrder)
router.get('/', verifyAccessToken, ctrls.getUserOrder)
router.get('/admin', verifyAccessToken,isAdmin, ctrls.getOders)








module.exports = router