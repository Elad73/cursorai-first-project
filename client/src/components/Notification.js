import React, { useState, useEffect } from 'react';
import '../styles/notification.css';

const Notification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={() => setIsVisible(false)} aria-label="Close notification">×</button>
    </div>
  );
};

export default Notification;
