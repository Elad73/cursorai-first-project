const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenses');

const app = express();

mongoose.connect('mongodb://localhost/budget_app', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));