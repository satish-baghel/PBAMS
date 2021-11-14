const mongoose = require('mongoose')

const ConnectDB = async () => {
  try {
    const res = await mongoose.connect(
      ` mongodb+srv://${process.env.MONGO_UR}:${process.env.MONGO_PWD}@satish.f113j.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )

    console.log('MongoDB connected..')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = ConnectDB
