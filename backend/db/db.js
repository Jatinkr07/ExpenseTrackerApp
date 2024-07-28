const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jatinkumar07911:expense123@blog-app.3mkxvgq.mongodb.net/?retryWrites=true&w=majority&appName=Blog-app"
    );
    console.log("Connected!!!");
  } catch (error) {
    console.log("Not Connected!!");
  }
};
module.exports = connectDB;
