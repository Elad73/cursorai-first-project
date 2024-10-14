import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../utils/api';
import '../styles/viewExpenses.css';

// Register the scales and elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ViewExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      setExpenses(response.data);
      prepareChartData(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const prepareChartData = (expensesData) => {
    const categoryTotals = expensesData.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Expenses',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Categories'
        }
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Amount ($)'
        }
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expense Chart by Category',
      },
    },
  };

  return (
    <div className="view-expenses-container">
      <h2>Expense Chart</h2>
      <div className="chart-wrapper">
        <div className="chart-container">
          {chartData ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewExpenses;
