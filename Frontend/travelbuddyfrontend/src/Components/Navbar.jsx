import React, { useState, useEffect, useRef } from "react";
import "../Assets/styles/Styles.css";
import Logo from "../Assets/images/logo-text.png";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'auto';
  }, [showMobileMenu]);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/">
            <img src={Logo} alt="logo of travel buddy" width="100px" />
          </a>
        </div>

        <div className="navbar-center">
          <a href="/">Place</a>
          <a href="/">Guide</a>
          <a href="/">Shop</a>
          <a href="/">Feed</a>
        </div>

        <div className="navbar-right">
          <i className="fa fa-user" onClick={toggleDropdown}></i>
          {showDropdown && (
            <div className="dropdown" ref={dropdownRef}>
              <a href="/">Profile</a>
              <a href="/">Hotels</a>
              <a href="/">Local Events</a>
              <a href="/">Currency Exchange</a>
              <a href="/">Translation</a>
              <a href="/">Transportation Services</a>
              <a href="/">Safety Guidelines</a>
              <a href="/">Logout</a>
            </div>
          )}
        </div>

        <div className="navbar-mobile" onClick={toggleMobileMenu}>
          <span>MENU </span><i className="fa fa-bars"></i>
        </div>

        {showMobileMenu && (
          <div className={`mobile-menu ${showMobileMenu ? "show" : ""}`}>
            <i
              className="fa fa-times close-icon"
              onClick={toggleMobileMenu}
            ></i>
            <div className="navbar-profile">
              <i className="fa fa-user"></i>
              <span>Profile</span>
            </div>
            <a href="/">Profile</a>
            <a href="/">Place</a>
            <a href="/">Guide</a>
            <a href="/">Shop</a>
            <a href="/">Feed</a>
            <a href="/">Hotels</a>
            <a href="/">Local Events</a>
            <a href="/">Currency Exchange</a>
            <a href="/">Translation</a>
            <a href="/">Transportation</a>
            <a href="/">Safety Guidelines</a>
            <a href="/">Logout</a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
