const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email:String,
  stream: String,
  rollNo: Number,
  password: String,
});

module.exports = mongoose.model("Student", studentSchema);
