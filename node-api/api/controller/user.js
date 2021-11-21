const niv = require('node-input-validator')
const UserDB = require('../models/user')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const { base64encode, base64decode } = require('nodejs-base64')
const Email = require('../helper/email')
const Helper = require('../helper')
/**
 *  { [admin, user, teacher ] registration } use
 */

exports.add = async (req, res) => {
  const ObjValidation = new niv.Validator(req.body, {
    role: 'required|integer|in:1,2,3',
    first_name: 'required',
    email: 'required|email',
    password: 'required|minLength:6',
    last_name: 'required',
  })

  const match = await ObjValidation.check()
  if (!match) {
    return res
      .status(422)
      .json({ message: 'Validation error', error: ObjValidation.errors })
  }
  const {
    role,
    first_name,
    last_name,
    middle_name,
    email,
    password,
    college,
    join_date,
  } = req.body
  const checkEmail = await UserDB.findOne({
    email: { $regex: email, $options: 'i' },
    flag: { $in: [1, 2] },
  })

  if (checkEmail) {
    return res.status(409).json({ message: 'email already exits' })
  }
  //
  const hashPassword = await bcrypt.hash(password, 10)

  const newObj = {}
  newObj.role = role
  newObj.first_name = first_name
  newObj.last_name = last_name
  newObj.middle_name = middle_name
  newObj.email = email
  newObj.college = college
  newObj.password = hashPassword
  newObj.join_date = join_date

  try {
    if (role != 1) {
      let encoded = base64encode(JSON.stringify(newObj))
      Email.SendMail(email, 'Verify your email', encoded)
    } else {
      const result = new UserDB(newObj)
      await result.save()
    }

    return res.status(200).json({
      message: `${
        parseInt(role) === 2 ? 'Teacher' : 'Student'
      } register successfully, please verify your email`,
      // result: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'error occur please try again later',
      error: err.message,
    })
  }
}

//

exports.login = async (req, res) => {
  const ObjValidation = new niv.Validator(req.body, {
    email: 'required|email',
    password: 'required|minLength:6',
  })

  const match = await ObjValidation.check()
  if (!match) {
    return res
      .status(422)
      .json({ message: 'Validation error', error: ObjValidation.errors })
  }
  const { email, password } = req.body

  try {
    const adminCheck = await UserDB.findOne({
      email: { $regex: email, $options: 'i' },
      flag: { $in: [1, 2, 4] },
    })
    console.log('file: user.js -> line 102 -> adminCheck', adminCheck)
    if (!adminCheck) {
      return res.status(401).json({ message: 'Invalid email and password ' })
    }
    if (adminCheck.flag === 4) {
      return res.status(401).json({
        message: 'Your profile register successfully please wait for approval ',
      })
    }

    const checkPassword = await bcrypt.compare(password, adminCheck.password)
    if (!checkPassword) {
      return res.status(409).json({ message: 'Invalid email and password ' })
    }
    const token = jwt.sign(
      { email: adminCheck.email, id: adminCheck._id },
      process.env.JWT_KEY
    )

    return res
      .status(200)
      .json({ message: 'Auth successfully', token: token, user: adminCheck })
  } catch (err) {
    return res.status(500).json({
      message: 'error occur please try again later',
      error: err.message,
    })
  }
}

//
exports.auth = async (req, res) => {
  try {
    const result = await UserDB.findOne({ email: req.userData.email })
    return res
      .status(200)
      .json({ message: 'Auth successfully', result: result })
  } catch (err) {
    return res.status(500).json({
      message: 'error occurred please try again later',
      error: err.message,
    })
  }
}

//
exports.verifyEmail = async (req, res) => {
  const ObjValidation = new niv.Validator(req.query, {
    token: 'required',
  })
  const matched = await ObjValidation.check()
  if (!matched) {
    return res
      .status(422)
      .json({ message: 'validation error', error: ObjValidation.errors })
  }
  try {
    const userObj = await JSON.parse(base64decode(req.query.token))
    console.log('file: user.js -> line 160 -> userObj', userObj)
    const checkEmail = await UserDB.findOne({
      email: { $regex: userObj.email, $options: 'i' },
      flag: [1, 2, 4],
      role: userObj.role,
    })
    if (checkEmail && checkEmail.flag === 4) {
      return res.status(409).json({
        message: `Your profile register successfully please wait for approval `,
      })
    }
    if (checkEmail) {
      return res.status(409).json({ message: 'Email already exits' })
    }
    const result = new UserDB(userObj)
    await result.save()
    return res.status(200).json({
      message: `${
        parseInt(userObj.role) === 2 ? 'Teacher' : 'Student'
      } register successfully`,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'error  occurred please try again later',
      error: err.message,
    })
  }
}

//
exports.userApprove = async (req, res) => {
  const { id } = req.params

  try {
    const result = await UserDB.findByIdAndUpdate(
      id,
      {
        $set: { flag: 1 },
      },
      { new: true }
    )

    return res
      .status(200)
      .json({ message: 'User has been successfully approved', result: result })
  } catch (err) {
    return res.status(500).json({
      message: 'error occurred please try again later',
      error: err.message,
    })
  }
}

exports.UserList = async (req, res) => {
  let { page, limit, search, type } = req.query
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
  type = parseInt(type)
  if (type === 4) {
    matchObj.flag = 4
    matchObj.role = { $in: [2, 3] }
  }
  if (type === 2) {
    matchObj.flag = { $in: [1, 2] }
    matchObj.role = 2
  }
  if (type === 3) {
    matchObj.flag = { $in: [1, 2] }
    matchObj.role = 3
  }
  matchObj.$or = [
    { fullName: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } },
  ]
  try {
    const teacherAggregate = UserDB.aggregate([
      {
        $project: {
          fullName: {
            $concat: ['$first_name', ' ', '$middle_name', ' ', '$last_name'],
          },
          email: 1,
          college: 1,
          join_date: 1,
          role: 1,
          profilePic: 1,
          flag: 1,
        },
      },
      { $match: matchObj },
    ])

    const result = await UserDB.aggregatePaginate(teacherAggregate, options)

    for (let i = 0; i < result.docs.length; i++) {
      const element = result.docs[i]
      element.profilePic = await Helper.getValidImageUrl(
        element.profilePic,
        element.fullName
      )
    }
    return res.status(200).json({
      message: 'user list has been retrieved',
      result: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'error occurred please try again later',
      error: err.message,
    })
  }
}
