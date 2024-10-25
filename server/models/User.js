   // server/models/User.js
   const mongoose = require('mongoose');

   const userSchema = new mongoose.Schema({
       email: { type: String, required: true, unique: true },
       name: String,
       provider: String, // e.g., 'facebook' or 'google'
       providerId: String, // ID from the provider
   });

   module.exports = mongoose.model('User', userSchema);