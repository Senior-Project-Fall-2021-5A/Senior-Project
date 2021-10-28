const mongoose = require('mongoose');
const db = 'mongodb+srv://Admin:uMUAkKcITOdFYFLr@telemedicine0.3ifgy.mongodb.net/Telemedicine_Backend?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('MongoDB connection Successful');
  } catch (error) {
    console.log(error.message);

    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;