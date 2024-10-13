const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.post('/', async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { view } = req.query;
    let startDate = new Date();
    if (view === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (view === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    }
    const expenses = await Expense.find({ date: { $gte: startDate } }).sort('date');
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;