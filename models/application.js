const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  status: { type: String, default: 'Pending' },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;