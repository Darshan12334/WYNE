import React, { useState } from 'react';
import './Navbar.css';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Predict', path: '/predict' },
    { name: 'Discover', path: '/discover' }
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <NavLink to="/" className="nav-link">
              WYNE
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <NavLink
                  to={link.path}
                  className="nav-link"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <NavLink to="/login">
                <button className="nav-login-btn">Login</button>
              </NavLink>
            </li>
          </ul>

          {/* Mobile Menu Icon */}
          <div className="hamburger" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div className="mobile-backdrop" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Mobile Side Drawer */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <button className="mobile-close-btn" onClick={() => setIsOpen(false)}>
          <X size={28} />
        </button>
        <ul className="mobile-nav-menu">
          {navLinks.map((link) => (
            <li key={link.name} className="mobile-nav-item">
              <NavLink
                to={link.path}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <li className="mobile-nav-item">
            <NavLink to="/login" onClick={() => setIsOpen(false)}>
              <button className="mobile-nav-login-btn">
                Login
              </button>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
