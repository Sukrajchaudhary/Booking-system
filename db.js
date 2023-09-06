const mongoose = require("mongoose");
exports.connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/booking");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
