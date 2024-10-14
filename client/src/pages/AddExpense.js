import React, { useState } from 'react';
import api from '../utils/api';
import '../styles/addExpense.css';

function AddExpense() {
  const [expense, setExpense] = useState({ amount: '', description: '', category: '', tags: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/expenses', expense);
      console.log('Expense added:', response.data);
      setExpense({ amount: '', description: '', category: '', tags: '' });
      alert('Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  };

  return (
    <div className="add-expense-container">
      <div className="add-expense-form">
        <h2>Add New Expense</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={expense.description}
            onChange={(e) => setExpense({ ...expense, description: e.target.value })}
            required
          />
          <select
            value={expense.category}
            onChange={(e) => setExpense({ ...expense, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="utilities">Utilities</option>
            {/* Add more categories as needed */}
          </select>
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={expense.tags}
            onChange={(e) => setExpense({ ...expense, tags: e.target.value })}
          />
          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
