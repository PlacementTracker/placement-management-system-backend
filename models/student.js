const mongoose = require('mongoose');

/*const studentSchema = new mongoose.Schema({
  name: String,
  email:String,
  stream: String,
  rollNo: Number,
  password: String,
});*/
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  batch: { type: String, required: true },
  photo: { type: String },
  resumeFile: { type: String },
  skills: { type: String },
  cgpa: { type: String },
  marksheetFile: { type: String }
});

module.exports = mongoose.model("Student", studentSchema);
