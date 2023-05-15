const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the admin's password before saving to database

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;