import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import '../styles/settings.css';
import Notification from '../components/Notification';
import { FaPlus, FaTrash, FaPencilAlt } from 'react-icons/fa';

function Settings() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', color: '#000000' });
  const [notification, setNotification] = useState(null);
  const [activeSection, setActiveSection] = useState('account');

  // Refs for each section
  const accountRef = useRef(null);
  const contactRef = useRef(null);
  const notificationRef = useRef(null);
  const passwordRef = useRef(null);
  const securityQuestionsRef = useRef(null);
  const twoFARef = useRef(null);
  const billingRef = useRef(null);
  const autoPaymentsRef = useRef(null);
  const categoryManagementRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      console.log('Fetched categories:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error.response || error);
      setNotification({ 
        message: `Failed to fetch categories. ${error.response?.data?.message || error.message}`, 
        type: 'error' 
      });
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/categories', newCategory);
      console.log('Response:', response);
      setNewCategory({ name: '', description: '', color: '#000000' });
      setNotification({ message: 'Category added successfully!', type: 'success' });
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error.response || error);
      setNotification({ 
        message: `Failed to add category. ${error.response?.data?.message || error.message}`, 
        type: 'error' 
      });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      console.log('Delete response:', response);
      setNotification({ message: 'Category deleted successfully!', type: 'success' });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error.response || error);
      setNotification({ 
        message: `Failed to delete category. ${error.response?.data?.message || error.message}`, 
        type: 'error' 
      });
    }
  };

  const scrollToSection = (ref, section) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };

  return (
    <div className="settings-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="settings-layout">
        <aside className="settings-sidebar">
          <h2>Account</h2>
          <nav>
            <a 
              onClick={() => scrollToSection(accountRef, 'account')}
              className={activeSection === 'account' ? 'active' : ''}
            >
              Your Account
            </a>
            <a 
              onClick={() => scrollToSection(contactRef, 'contact')}
              className={activeSection === 'contact' ? 'active' : ''}
            >
              Contact Info
            </a>
            <a 
              onClick={() => scrollToSection(notificationRef, 'notification')}
              className={activeSection === 'notification' ? 'active' : ''}
            >
              Notification
            </a>
          </nav>
          <h2>Security & Login</h2>
          <nav>
            <a 
              onClick={() => scrollToSection(passwordRef, 'password')}
              className={activeSection === 'password' ? 'active' : ''}
            >
              Password
            </a>
            <a 
              onClick={() => scrollToSection(securityQuestionsRef, 'securityQuestions')}
              className={activeSection === 'securityQuestions' ? 'active' : ''}
            >
              Security questions
            </a>
            <a 
              onClick={() => scrollToSection(twoFARef, 'twoFA')}
              className={activeSection === 'twoFA' ? 'active' : ''}
            >
              2 Step Verification
            </a>
          </nav>
          <h2>Bills & Payment</h2>
          <nav>
            <a 
              onClick={() => scrollToSection(billingRef, 'billing')}
              className={activeSection === 'billing' ? 'active' : ''}
            >
              Billing Method
            </a>
            <a 
              onClick={() => scrollToSection(autoPaymentsRef, 'autoPayments')}
              className={activeSection === 'autoPayments' ? 'active' : ''}
            >
              Automatic payments
            </a>
          </nav>
          <h2>General Settings</h2>
          <nav>
            <a 
              onClick={() => scrollToSection(categoryManagementRef, 'categoryManagement')}
              className={activeSection === 'categoryManagement' ? 'active' : ''}
            >
              Category Management
            </a>
          </nav>
        </aside>
        <main className="settings-main">
          <section ref={accountRef} className="account-info">
            <h2>Your Account</h2>
            <div className="form-group">
              <div>
                <label>User ID</label>
                <input type="text" readOnly value="12345" />
              </div>
              <div>
                <label>First Name</label>
                <input type="text" value="John" />
                <button className="edit-btn">Edit</button>
              </div>
            </div>
            <div className="form-group">
              <div>
                <label>Last Name</label>
                <input type="text" value="Doe" />
                <button className="edit-btn">Edit</button>
              </div>
              <div>
                <label>Email</label>
                <input type="email" value="john.doe@example.com" />
                <button className="edit-btn">Edit</button>
              </div>
            </div>
            <div className="delete-account">
              <h3>Delete Account</h3>
              <p>Deleting your account will remove all your content, data and information.</p>
              <button className="delete-btn">I want to delete my account</button>
            </div>
          </section>
          <section ref={contactRef} className="contact-info">
            <h2>Contact Info</h2>
            <div className="form-group">
              <div>
                <label>Address</label>
                <input type="text" placeholder="Enter your address" />
              </div>
              <div>
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter your phone number" />
              </div>
            </div>
          </section>
          <section ref={notificationRef}>
            <h2>Notification</h2>
            {/* Add notification settings here */}
          </section>
          <section ref={passwordRef}>
            <h2>Password</h2>
            {/* Add password change form here */}
          </section>
          <section ref={securityQuestionsRef}>
            <h2>Security Questions</h2>
            {/* Add security questions form here */}
          </section>
          <section ref={twoFARef}>
            <h2>2 Step Verification</h2>
            {/* Add 2FA settings here */}
          </section>
          <section ref={billingRef}>
            <h2>Billing Method</h2>
            {/* Add billing method settings here */}
          </section>
          <section ref={autoPaymentsRef}>
            <h2>Automatic Payments</h2>
            {/* Add automatic payments settings here */}
          </section>
          <section ref={categoryManagementRef} className="category-management">
            <h2>Category Management</h2>
            <form onSubmit={handleAddCategory} className="category-form">
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                placeholder="Category name"
                required
              />
              <input
                type="text"
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                placeholder="Category description"
              />
              <input
                type="color"
                value={newCategory.color}
                onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                required
              />
              <button type="submit" className="add-category-btn">
                <FaPlus /> Add Category
              </button>
            </form>
            <ul className="category-list">
              {categories.map((category) => (
                <li key={category._id} style={{ borderLeft: `4px solid ${category.color}` }}>
                  <div className="category-info">
                    <span className="category-name">{category.name}</span>
                    <span className="category-description">{category.description}</span>
                  </div>
                  <div className="category-actions">
                    <button className="edit-category-btn">
                      <FaPencilAlt />
                    </button>
                    <button
                      className="delete-category-btn"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Settings;