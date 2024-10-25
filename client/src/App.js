import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import './styles/global.css';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import ViewExpenses from './pages/ViewExpenses';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home subtitle="Your personal finance tracker" />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/view-expenses" element={<ViewExpenses />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
