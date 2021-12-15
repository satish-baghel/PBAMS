const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const multer = require('multer')
const adminAuth = require('../middleware/adminAuth')
//
const storage = multer({
  dest: 'upload/',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})
const upload = multer({ storage: storage })
//
router.post('/', upload.single('profile_pic'), userController.add)
router.post('/login', userController.login)
router.get('/auth', adminAuth, userController.auth)
router.get('/verify-email', userController.verifyEmail)
router.put('/approve/:id', adminAuth, userController.userApprove)
router.get('/list', adminAuth, userController.UserList)
router.patch('/:id', adminAuth, userController.userDetails)
router.patch('/certificate/:id', adminAuth, userController.userCertificate)

module.exports = router
