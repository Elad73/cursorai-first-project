const express = require('express');
const connectDB = require('./db');
const expensesRouter = require('./routes/expenses');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/expenses', expensesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));