const mongoose = require('mongoose')
const { Schema } = mongoose

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
      required: true,
    },
    role: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    phone_number: {
      type: String,
      default: '',
    },
    join_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('user', userSchema)
