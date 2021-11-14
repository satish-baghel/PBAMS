const mongoose = require('mongoose')
const { Schema } = mongoose
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: '',
    },

    college: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    role: {
      type: Number,
      enum: [1, 2, 3], // @role [1 = admin 2 = teacher 3 = student]
      required: true,
    },
    phone_number: {
      type: String,
      default: '',
    },
    join_date: {
      type: Date,
      default: null,
    },
    flag: {
      type: Number,
      default: 4,
      enum: [1, 2, 3, 4], // @ 1 Activated 2 deactivated 3 Delete 4 New User
    },
  },
  {
    timestamps: true,
  }
)

userSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('user', userSchema)
