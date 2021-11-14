const mongoose = require('mongoose')
const { Schema } = mongoose
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const CollegeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    flag: {
      type: Number,
      enum: [1, 2, 3],
      default: 1, // 1 active 2 deactivate 3 delete
    },
  },
  { timestamps: true }
)
CollegeSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('college', CollegeSchema)
