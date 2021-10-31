const mongoose = require('mongoose')
const { Schema } = mongoose

/**
 *
 */
const certificateSchema = new Schema(
  {
    ids: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('certificate', certificateSchema)
