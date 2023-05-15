const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  jobId: {type:String , required:true ,unique:true},
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  companyName: {type:String , required:true},
  companyDesc: {type:String , required:true},
  jdFile: {type:String },
  applyLink: {type:String},
  
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;