import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
    setIsOpen(!isOpen);
    };
    
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BudgetMaster
        </Link>
        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/add-expense" className="nav-link" onClick={() => setIsOpen(false)}>Add Expense</Link>
          </li>
          <li className="nav-item">
            <Link to="/view-expenses" className="nav-link" onClick={() => setIsOpen(false)}>View Expenses</Link>
          </li>
          <li className="nav-item">
            <Link to="/reports" className="nav-link" onClick={() => setIsOpen(false)}>Reports</Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link" onClick={() => setIsOpen(false)}>Settings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
