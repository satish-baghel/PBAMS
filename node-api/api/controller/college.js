const CollegeDB = require('../models/college')
const niv = require('node-input-validator')
const mongoose = require('mongoose')

exports.add = async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    title: 'required',
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res
      .status(422)
      .json({ message: 'validation error', error: objValidation.errors })
  }
  const { title } = req.body
  const checkCollege = await CollegeDB.aggregate([
    { $addFields: { title: { $toLower: '$title' } } },
    { $match: { title: title.toLowerCase() } },
  ])
  if (checkCollege.length > 0) {
    return res.status(409).json({ message: 'college already exits' })
  }
  let newObj = {}

  newObj['title'] = title
  try {
    const result = new CollegeDB(newObj)
    await result.save()
    return res
      .status(200)
      .json({ message: 'College has been successfully added', result: result })
  } catch (err) {
    return res.status(500).json({
      message: 'error occurred please try again later',
      error: err.message,
    })
  }
}

exports.get = async (req, res) => {
  let { page, limit, search } = req.query
  if ([null, undefined, ''].includes(page)) {
    page = 1
  }
  if ([null, undefined, ''].includes(limit)) {
    limit = 10
  }
  if ([null, undefined, ''].includes(search)) {
    search = ''
  }
  const options = {
    page: page,
    limit: limit,
  }
  let matchObj = {}
  matchObj.title = { $regex: search, $options: 'i' }
  matchObj.flag = 1
  try {
    const collegeAggregation = CollegeDB.aggregate([
      { $match: matchObj },
      {
        $project: {
          title: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ])
    const result = await CollegeDB.aggregatePaginate(
      collegeAggregation,
      options
    )
    return res.status(200).json({
      message: 'College has been retrieved ',
      result: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'error occurred please try again later',
      error: err.message,
    })
  }
}

exports.dropDown = async (req, res) => {
  try {
    const result = await CollegeDB.find({ flag: { $in: [1] } })
      .sort({ title: 1 })
      .select('_id title')
    return res
      .status(200)
      .json({ message: 'drop down has been retrieved ', result: result })
  } catch (err) {
    return res.status(500).json({
      message: 'error occurred please try again later',
      error: err.message,
    })
  }
}

exports.edit = async (req, res) => {
  const { id } = req.params
  const objValidation = new niv.Validator(req.body, {
    title: 'required',
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res
      .status(422)
      .json({ message: 'validation error', error: objValidation.errors })
  }
  const { title } = req.body
  const checkCollege = await CollegeDB.aggregate([
    { $match: { _id: { $ne: mongoose.Types.ObjectId(id) } } },
    { $addFields: { title: { $toLower: '$title' } } },
    { $match: { title: title.toLowerCase() } },
  ])

  if (checkCollege.length > 0) {
    return res.status(409).json({ message: 'college already exits' })
  }
  let newObj = {}

  newObj['title'] = title
  try {
    const result = await CollegeDB.findByIdAndUpdate(
      id,
      { $set: newObj },
      { new: true }
    )
    return res.status(200).json({
      message: 'College has been successfully updated',
      result: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'error occurred please try again later',
      error: err.message,
    })
  }
}

//
exports.changeStatus = async (req, res) => {
  const { id } = req.params
  const objValidation = new niv.Validator(req.body, {
    flag: 'required|numeric|in:1,2,3',
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res
      .status(422)
      .json({ message: 'validation error', error: objValidation.errors })
  }
  try {
    let updateObj = {}
    updateObj.flag = req.body.flag
    let message = 'College has been successfully enabled'
    if (req.body.flag == 2) {
      message = 'College has been successfully disabled'
    }
    if (req.body.flag == 3) {
      message = 'College has been successfully deleted'
    }
    const result = await CollegeDB.findByIdAndUpdate(
      id,
      {
        $set: { flag: req.body.flag },
      },
      { new: true }
    )

    return res.status(200).json({ message: message, result: result })
  } catch (err) {
    return res.status(500).json({
      message: 'error occurred please try again later',
      error: err.message,
    })
  }
}
