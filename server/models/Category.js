const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  priority: { type: Number, required: true },
  color: { type: String, required: true }
});

module.exports = mongoose.model('Category', CategorySchema);
