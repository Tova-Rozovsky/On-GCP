import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { getUserData, getCookie, removeCookie } from '../httpController';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showOptions, setShowOptions] = useState(false); 
  const userId = getCookie('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(userId); 
        setUser(data[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      setUser(null); 
    }
  }, [userId]);

  const handleContactClick = (event) => {
    event.preventDefault();
    navigate('/home/contact');
  };

  const handleProfileClick = () => {
    setShowOptions(!showOptions); 
  };

  const handleLogout = () => {
    removeCookie('token');
    removeCookie('userId');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="nav-bar">
      
      <div className="nav-profile-container">
        <div className="user-profile">
          {user ? (
            <>
              <FaUserCircle className="profile-icon" onClick={handleProfileClick} />
              <span onClick={handleProfileClick}>{user.userName}</span>
              {showOptions && (
                <ul className="profile-options">
                  <li><a href="/profile">הפרופיל שלי</a></li>
                  <li><button onClick={handleLogout}>יציאה <FaSignOutAlt /></button></li>
                </ul>
              )}
            </>
          ) : (
            <>
              <FaUserCircle className="profile-icon" onClick={handleProfileClick} />
              <span onClick={handleProfileClick}>אורח</span>
              {showOptions && (
                <ul className="profile-options">
                  <li><a href="/login">התחברות</a></li>
                </ul>
              )}
            </>
          )}
        </div>
        <div className="side-menu">
          <ul className="nav-links">
            <li><a href="/home">אודות</a></li>
            <li><a href="/helpRequest">בקשת סיוע</a></li>
            <li><a href="/volunteer">התנדבות</a></li>
            <li><a href="#contact" onClick={handleContactClick}>צור קשר</a></li>
          </ul>
        </div>
      </div>
      <div className="logo">
        <a href="/">
          <img src="the logo.png" alt="logo" />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
