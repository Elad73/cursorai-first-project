import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import '../styles/settings.css';
import Notification from '../components/Notification';

function Settings() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', priority: 1, color: '#000000' });
  const [notification, setNotification] = useState(null);

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
      setNewCategory({ name: '', description: '', priority: 1, color: '#000000' });
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

  return (
    <div className="settings-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <h1>Settings</h1>
      <div className="category-management">
        <h2>Category Management</h2>
        <form onSubmit={handleAddCategory}>
          <input
            value={newCategory.name}
            onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
            placeholder="Category Name"
            required
          />
          <input
            value={newCategory.description}
            onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
            placeholder="Description"
          />
          <input
            type="number"
            min="1"
            value={newCategory.priority}
            onChange={(e) => setNewCategory({...newCategory, priority: parseInt(e.target.value)})}
            placeholder="Priority"
            required
          />
          <input
            type="color"
            value={newCategory.color}
            onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
            required
          />
          <button type="submit">Add Category</button>
        </form>
        <ul>
          {categories.map(category => (
            <li key={category._id}>
              {category.name} - Priority: {category.priority}
              <span style={{ backgroundColor: category.color, display: 'inline-block', width: '20px', height: '20px', marginLeft: '10px' }}></span>
              <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Settings;
