import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.png';
import '../styles/home.css';
import Navbar from '../components/Navbar.js';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <img src={heroImage} alt="Budget Hero" className="hero-image" />
        <div className="hero-content">
          <h1 className="home-title">BudgetMaster</h1>
          <p className="home-description">Take control of your finances with ease</p>
          <Link to="/add-expense" className="cta-button" style={{ fontSize: '1.1rem', padding: '12px 24px' }}>Start Budgeting</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
