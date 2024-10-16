import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import api from '../utils/api';
import '../styles/viewExpenses.css';

// Register the scales and elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function ViewExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      await fetchExpenses();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (expenses.length > 0 && Object.keys(categories).length > 0) {
      prepareChartData(expenses);
    }
  }, [expenses, categories]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      const categoryMap = {};
      response.data.forEach(category => {
        categoryMap[category._id] = { name: category.name, color: category.color };
      });
      setCategories(categoryMap);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      console.log('Raw expenses data:', response.data);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const prepareChartData = (expensesData) => {
    const categoryTotals = {};
    const categoryColors = {};

    expensesData.forEach(expense => {
      const category = categories[expense.category] || { name: 'Unknown', color: '#808080' };
      const categoryName = category.name;
      if (!categoryTotals[categoryName]) {
        categoryTotals[categoryName] = 0;
        categoryColors[categoryName] = category.color;
      }
      categoryTotals[categoryName] += expense.amount;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const backgroundColor = labels.map(label => categoryColors[label]);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Expenses (NIS)',
          data,
          backgroundColor,
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
          text: 'Amount (NIS)'
        },
        ticks: {
          callback: function(value, index, values) {
            return '₪' + value.toLocaleString('he-IL');
          }
        }
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend since each bar has a unique color
      },
      title: {
        display: true,
        text: 'Expense Chart by Category (NIS)',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '₪' + context.parsed.y.toLocaleString('he-IL');
            }
            return label;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => '₪' + value.toLocaleString('he-IL'),
        font: {
          weight: 'bold'
        },
        color: 'black', // Ensure label text is visible on all background colors
      }
    },
  };

  return (
    <div className="view-expenses-container">
      <h2>Expense Chart</h2>
      <div className="chart-wrapper">
        <div className="chart-container">
          {chartData ? (
            <Bar 
              data={chartData} 
              options={chartOptions}
            />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewExpenses;
