const router = require('express').Router()
const ctrls = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')


router.get('/', ctrls.getBlogs) 
router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog)
router.get('/one/:bid', ctrls.getBlog)
router.put('/likes/:bid', [verifyAccessToken], ctrls.likeBlog)
router.put('/dislike/:bid', [verifyAccessToken], ctrls.disLikeBlog)
router.put('/image/:bid', [verifyAccessToken, isAdmin],uploader.array('images',10), ctrls.uploadImagesBlog)
router.put('/update/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog)








module.exports = router