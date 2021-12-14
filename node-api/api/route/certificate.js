const express = require('express')
const router = express.Router()
const AdminAuth = require('../middleware/adminAuth')
const certificateController = require('../controller/certificate')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/certificate/')
  },

  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    )
  },
})
// const fileFilter = (req, file, cb) => {
// reject a file
//   if (
//     file.mimetype === 'image/jpeg' ||
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'pad' ||
//   ) {
//     cb(null, true)
//   } else {
//     cb(null, false)
//     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
//   }
// }
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 4,
  },
  //   fileFilter: fileFilter,
})
router.post(
  '/',
  AdminAuth,
  upload.single('document'),
  certificateController.add
)
router.put(
  '/:id',
  AdminAuth,
  upload.single('document'),
  certificateController.update
)

router.delete('/:id', AdminAuth, certificateController.delete)
router.get('/', AdminAuth, certificateController.getAll)

module.exports = router
