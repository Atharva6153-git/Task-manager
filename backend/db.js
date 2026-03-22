const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.log('MongoDB connection failed:', error.message)
    console.log('Full error:', error)
  }
}

module.exports = connectDB