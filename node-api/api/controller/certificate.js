const CertificateDB = require('../models/certificate')
const niv = require('node-input-validator')
const Helper = require('../helper/')

//
exports.add = async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    title: 'required',
    course_title: 'required',
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res
      .status(422)
      .json({ message: 'validation error', error: objValidation.errors })
  }
  const { title, course_title } = req.body
  let newObj = {}
  console.log(req.file)
  newObj['title'] = title
  newObj['course_title'] = course_title
  newObj['document'] = `${req.file.destination}${req.file.filename}`
  newObj['user_id'] = req.userData._id

  try {
    const result = new CertificateDB(newObj)
    await result.save()
    return res.status(200).json({
      message: 'Certificate has been successfully added',
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
exports.update = async (req, res) => {
  const { id } = req.params
  const objValidation = new niv.Validator(req.body, {
    title: 'required',
    course_title: 'required',
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res
      .status(422)
      .json({ message: 'validation error', error: objValidation.errors })
  }
  const { title, course_title } = req.body
  let updateObj = {}

  updateObj['title'] = title
  updateObj['course_title'] = course_title
  if (req.file) {
    updateObj['document'] = `${req.file.destination}${req.file.filename}`
  }

  updateObj['user_id'] = req.userData._id

  try {
    const result = await CertificateDB.findByIdAndUpdate(
      id,
      {
        $set: updateObj,
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Certificate has been successfully updated',
      result: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'error occurred please try again later',
      error: err.message,
    })
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params

  try {
    const result = await CertificateDB.findByIdAndDelete(id)

    return res.status(200).json({
      message: 'Certificate has been successfully deleted',
      result: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'error occurred please try again later',
      error: err.message,
    })
  }
}

exports.getAll = async (req, res) => {
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
  if (search) matchObj.title = { $regex: search, $options: 'i' }

  try {
    const certificateAggregate = CertificateDB.aggregate([
      { $match: matchObj },
      { $sort: { createAt: -1 } },
    ])
    const result = await CertificateDB.aggregatePaginate(
      certificateAggregate,
      options
    )

    for (let i = 0; i < result.docs.length; i++) {
      const element = result.docs[i]
      console.log('file: college.js -> line 76 -> element', element)
      element.document = await Helper.getValidImage(element.document)
    }
    return res
      .status(200)
      .json({ message: 'certificate has been retrieved ', result: result })
  } catch (err) {
    return res.status(500).json({
      message: 'error occurred please try again later',
      error: err.message,
    })
  }
}
