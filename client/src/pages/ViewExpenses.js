import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import '../styles/viewExpenses.css';

function ViewExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [viewMode, setViewMode] = useState('week');

  useEffect(() => {
    fetchExpenses();
  }, [viewMode]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`/api/expenses?view=${viewMode}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const chartData = {
    labels: expenses.map(exp => exp.date),
    datasets: [{
      label: 'Expenses',
      data: expenses.map(exp => exp.amount),
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1
    }]
  };

  return (
    <div className="view-expenses">
      <h2>Expense Overview</h2>
      <div className="view-toggle">
        <button onClick={() => setViewMode('week')} className={viewMode === 'week' ? 'active' : ''}>Week</button>
        <button onClick={() => setViewMode('month')} className={viewMode === 'month' ? 'active' : ''}>Month</button>
      </div>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default ViewExpenses;