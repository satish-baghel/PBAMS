const express = require('express')
const router = express.Router()
const AdminAuth = require('../middleware/adminAuth')
const CollegeController = require('../controller/college')
//
router.post('/', AdminAuth, CollegeController.add)
router.get('/', AdminAuth, CollegeController.get)
router.get('/drop-down', CollegeController.dropDown)
router.put('/:id', AdminAuth, CollegeController.edit)
router.put('/change-status/:id', AdminAuth, CollegeController.changeStatus)
module.exports = router
