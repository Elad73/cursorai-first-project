const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const expensesRouter = require('./routes/expenses');
const categoryRoutes = require('./routes/categories');
const cors = require('cors');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/api/expenses', expensesRouter);
app.use('/api/categories', categoryRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));