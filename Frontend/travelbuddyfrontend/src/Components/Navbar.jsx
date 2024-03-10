import React, { useState, useEffect, useRef, Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Assets/styles/Styles.css";
import Logo from "../Assets/images/logo-text.png";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const iconRef = useRef(null);
  //Check cookies/token and decide whether loggedin or not
  const [loggedin, setLoggedin] = useState();

  const Navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown((ShowDropdown) => !ShowDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  //Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Disable scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
  }, [showMobileMenu]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const userCheck = async () => {
    let response = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 200) {
      setLoggedin(true);
    }
  };

  useEffect(() => {
    userCheck();
  }, []);

  const logout = async () => {
    let response = await fetch("http://127.0.1:8000/user/logout", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 200) {
      setLoggedin(false);
      alert("Logged out successfully");
      handleClose();
      Navigate("/login")
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/">
            <img src={Logo} alt="logo of travel buddy" width="100px" />
          </a>
        </div>

        <div className="navbar-center">
          <NavLink to="/place" activeclassname="active">
            Place
          </NavLink>
          <NavLink to="/guide" activeclassname="active">
            Guide
          </NavLink>
          <NavLink to="/product" activeclassname="active">
            Shop
          </NavLink>
          <NavLink to="/feed" activeclassname="active">
            Feed
          </NavLink>
        </div>

        <div className="navbar-right">
          <i className="fa fa-user" ref={iconRef} onClick={toggleDropdown}></i>
          {showDropdown && (
            <div className="dropdown" ref={dropdownRef}>
              {loggedin ? (
                <>
                  <a href="/profile">Profile</a>
                  <a href="/hotel">Hotels</a>
                  <a href="/localevents">Local Events</a>
                  <a href="/currencyexchange">Currency Exchange</a>
                  <a href="/translation">Translation</a>
                  <a href="/transportation">Transportation Services</a>
                  <a href="/safetyguidelines">Safety Guidelines</a>
                  <button className="logout-button" onClick={handleOpen}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a className="link-bg" href="/login">
                    Login
                  </a>
                  <a className="link-bg" href="/register">
                    Register
                  </a>
                  <a href="/hotel">Hotels</a>
                  <a href="/localevents">Local Events</a>
                  <a href="/currencyexchange">Currency Exchange</a>
                  <a href="/translation">Translation</a>
                  <a href="/transportation">Transportation Services</a>
                  <a href="/safetyguidelines">Safety Guidelines</a>
                </>
              )}
            </div>
          )}
        </div>

        <div className="navbar-mobile" onClick={toggleMobileMenu}>
          <span>MENU </span>
          <i className="fa fa-bars"></i>
        </div>

        {showMobileMenu && (
          <div className={`mobile-menu ${showMobileMenu ? "show" : ""}`}>
            <i
              className="fa fa-times close-icon"
              onClick={toggleMobileMenu}
            ></i>

            {loggedin ? (
              <>
                <div className="navbar-profile">
                  <i className="fa fa-user"></i>
                  <span>Name</span>
                </div>
                <a href="/profile">Profile</a>
                <a href="/place">Place</a>
                <a href="/guide">Guide</a>
                <a href="/product">Shop</a>
                <a href="/feed">Feed</a>
                <a href="/hotel">Hotels</a>
                <a href="/localevents">Local Events</a>
                <a href="/currencyexchange">Currency Exchange</a>
                <a href="/translation">Translation</a>
                <a href="/transportation">Transportation Services</a>
                <a href="/safetyguidelines">Safety Guidelines</a>
                <button className="logout-button" onClick={handleOpen}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a className="link-bg" href="/login">
                  Login
                </a>
                <a className="link-bg" href="/register">
                  Register
                </a>
                <a href="/place">Place</a>
                <a href="/guide">Guide</a>
                <a href="/product">Shop</a>
                <a href="/feed">Feed</a>
                <a href="/hotel">Hotels</a>
                <a href="/localevents">Local Events</a>
                <a href="/currencyexchange">Currency Exchange</a>
                <a href="/translation">Translation</a>
                <a href="/transportation">Transportation Services</a>
                <a href="/safetyguidelines">Safety Guidelines</a>
              </>
            )}
          </div>
        )}
      </nav>

      <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Log Out?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              No
            </Button>
            <Button autoFocus onClick={logout}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default Navbar;
