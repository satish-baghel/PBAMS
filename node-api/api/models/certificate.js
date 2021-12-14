const mongoose = require('mongoose')
const { Schema } = mongoose
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
/**
 *
 */
const certificateSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
    course_title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
certificateSchema.plugin(aggregatePaginate)
module.exports = mongoose.model('certificate', certificateSchema)
