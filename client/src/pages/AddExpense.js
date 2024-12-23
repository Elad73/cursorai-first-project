import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import '../styles/addExpense.css';
import Notification from '../components/Notification';


function AddExpense() {
  const [expense, setExpense] = useState({ amount: '', description: '', category: '', tags: '' });
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      // Sort categories by priority in descending order
      const sortedCategories = response.data.sort((a, b) => a.priority - b.priority);
      setCategories(sortedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setNotification({ message: 'Failed to fetch categories. Please try again.', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/expenses', expense);
      console.log('Expense added:', response.data);
      setExpense({ amount: '', description: '', category: '', tags: '' });
      setNotification({ message: 'Expense added successfully!', type: 'success' });
    } catch (error) {
      console.error('Error adding expense:', error);
      setNotification({ message: 'Failed to add expense. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="add-expense-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
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
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
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
