const router = require('express').Router()
const ctris = require('../controllers/user')
const {verifyAccessToken, isAdmin} = require ('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')


router.post('/register', ctris.register)
router.get('/finalregister/:token', ctris.finalRegister)
router.post('/login', ctris.login)
router.get('/current', verifyAccessToken, ctris.getCurrent)
router.post('/refreshtoken', ctris.refreshAccessToken)
router.get('/logout', ctris.logout)
router.post('/forgotpassword', ctris.forgotPassword)
router.put('/resetpassword', ctris.resetPassword)
router.get('/', [verifyAccessToken, isAdmin],ctris.getUsers)
router.delete('/:uid', [verifyAccessToken, isAdmin], ctris.deleteUser);
router.put('/current', verifyAccessToken,uploader.single('avatar'), ctris.updateUser)
router.put('/address', [verifyAccessToken], ctris.updateUserAddress)
router.put('/cart', [verifyAccessToken], ctris.updateCart)
router.delete('/remove-cart/:pid', [verifyAccessToken], ctris.removeProductInCart)
router.put('/:uid', [verifyAccessToken, isAdmin], ctris.updateUserByAdmin)
  


  





module.exports = router

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE 