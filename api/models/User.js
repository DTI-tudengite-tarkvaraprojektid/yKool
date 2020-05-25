const mongoose = require('mongoose');


// ROLES 
// 0 -> admin
// 1 -> teacher
// 2 -> student

const userSchema = new mongoose.Schema({
  emil: { type: String, required: true },
  fullName: { type: String, required: true } ,
  role: { type: Number, required: true },
  couseID: [{ type: String }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;