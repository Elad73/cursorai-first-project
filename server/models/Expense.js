const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', ExpenseSchema);