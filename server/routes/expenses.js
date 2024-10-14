const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.post('/', async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch all expenses
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to fetch expenses');
    
    // Remove date filtering for now
    const expenses = await Expense.find({}).sort('date');
    
    console.log('Number of expenses found:', expenses.length);
    console.log('Expenses:', JSON.stringify(expenses, null, 2));
    
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
});

module.exports = router;
