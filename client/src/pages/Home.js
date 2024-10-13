import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.png';
import '../styles/home.css';
import Navbar from '../components/Navbar.js';

function Home() {
  return (
      <div className="home-container">
    <Navbar />
      <div className="hero-section">
        <img src={heroImage} alt="Budget Hero" className="hero-image" />
        <div className="hero-content">
          <h1 className="home-title">BudgetMaster</h1>
          <p className="app-description">Take control of your finances with ease</p>
          <Link to="/add-expense" className="cta-button">Start Budgeting</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
