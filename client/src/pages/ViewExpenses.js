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
          label: 'Expenses (NIS)',
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
        position: 'top',
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
        }
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
