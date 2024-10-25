import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import '../styles/navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Authentication state:', isAuthenticated);
    }, [isAuthenticated]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        setIsAuthenticated(false);
        navigate('/login');
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
                    {!isAuthenticated ? (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Login</Link>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link to="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
