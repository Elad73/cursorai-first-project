import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/global.css';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import ViewExpenses from './pages/ViewExpenses';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home subtitle="Your personal finance tracker" />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/view-expenses" element={<ViewExpenses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
