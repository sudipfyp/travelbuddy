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
import swal from "sweetalert";

const Navbar = () => {
  const [user, setUser] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const iconRef = useRef(null);
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
      let data = await response.json();
      setUser(data);
      console.log(data);
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
      swal("Logged Out", "You have been logged out", "success");
      handleClose();
      Navigate("/");
    }
  };

  return (
    <div>
      {user.role === "guide" ? (
        <nav className="navbar">
          <div className="navbar-left">
            <a href="/guidehomepage">
              <img src={Logo} alt="logo of travel buddy" width="100px" />
            </a>
          </div>

          <div className="navbar-center">
            <NavLink to="/guidehomepage" activeclassname="active">
              Request
            </NavLink>
            <NavLink to="/ongoinghirings" activeclassname="active">
              Ongoing
            </NavLink>
            <NavLink to="/guideapply" activeclassname="active">
              Apply
            </NavLink>
            <NavLink to="/chat" activeclassname="active">
              Chat
            </NavLink>
          </div>

          <div className="navbar-right">
            <i
              className="fa fa-user"
              ref={iconRef}
              onClick={toggleDropdown}
            ></i>
            {showDropdown && (
              <div className="dropdown" ref={dropdownRef}>
                <a href="/profile">Profile</a>
                <a href="/translation">Translation</a>
                <a href="/currencyexchange">Currency Exchange</a>
                <button className="logout-button" onClick={handleOpen}>
                  Logout
                </button>
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

              <div className="navbar-profile">
                <i className="fa fa-user"></i>
                <span>{user.role}</span>
              </div>
              <a href="/profile">Profile</a>
              <a href="/ongoinghirings">Ongoing Hirings</a>
              <a href="/guideapply">Apply</a>
              <a href="/chat">Chat</a>
              <a href="/translation">Translation</a>
              <a href="/currencyexchange">Currency Exchange</a>
              <button className="logout-button" onClick={handleOpen}>
                Logout
              </button>
            </div>
          )}
        </nav>
      ) : user.role === "seller" ? (
        <nav className="navbar">
          <div className="navbar-left">
            <a href="/sellerhomepage">
              <img src={Logo} alt="logo of travel buddy" width="100px" />
            </a>
          </div>

          {user.type === "Hotel" ? (
            <>
              <div className="navbar-center">
                <NavLink to="/sellerhomepage" activeclassname="active">
                  Bookings
                </NavLink>
                <NavLink to="/ongoingbookings" activeclassname="active">
                  Current Bookings
                </NavLink>
                <NavLink to="/managehotel" activeclassname="active">
                  Manage Hotel
                </NavLink>
                <NavLink to="/chat" activeclassname="active">
                  Chat
                </NavLink>
              </div>

              <div className="navbar-right">
                <i
                  className="fa fa-user"
                  ref={iconRef}
                  onClick={toggleDropdown}
                ></i>
                {showDropdown && (
                  <div className="dropdown" ref={dropdownRef}>
                    <a href="/profile">Profile</a>
                    <a href="/translation">Translation</a>
                    <a href="/currencyexchange">Currency Exchange</a>
                    <button className="logout-button" onClick={handleOpen}>
                      Logout
                    </button>
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

                  <div className="navbar-profile">
                    <i className="fa fa-user"></i>
                    <span>
                      {user.role} ({user.type})
                    </span>
                  </div>
                  <a href="/profile">Profile</a>
                  <a href="/managehotel">Manage Hotel</a>
                  <a href="/ongoingbookings">Current Bookings</a>
                  <a href="/chat">Chat</a>
                  <a href="/translation">Translation</a>
                  <a href="/currencyexchange">Currency Exchange</a>
                  <button className="logout-button" onClick={handleOpen}>
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="navbar-center">
                <NavLink to="/sellerhomepage" activeclassname="active">
                  Home
                </NavLink>
                <NavLink to="/addproduct" activeclassname="active">
                  Manage Product
                </NavLink>
                <NavLink to="/manageshop" activeclassname="active">
                  Manage Shop
                </NavLink>
                <NavLink to="/chat" activeclassname="active">
                  Chat
                </NavLink>
              </div>

              <div className="navbar-right">
                <i
                  className="fa fa-user"
                  ref={iconRef}
                  onClick={toggleDropdown}
                ></i>
                {showDropdown && (
                  <div className="dropdown" ref={dropdownRef}>
                    <a href="/profile">Profile</a>
                    <a href="/translation">Translation</a>
                    <a href="/currencyexchange">Currency Exchange</a>
                    <button className="logout-button" onClick={handleOpen}>
                      Logout
                    </button>
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

                  <div className="navbar-profile">
                    <i className="fa fa-user"></i>
                    <span>
                      {user.role} ({user.type})
                    </span>
                  </div>
                  <a href="/profile">Profile</a>
                  <a href="/manageshop">Manage Shop</a>
                  <a href="/addproduct">Manage Product</a>
                  <a href="/chat">Chat</a>
                  <a href="/translation">Translation</a>
                  <a href="/currencyexchange">Currency Exchange</a>
                  <button className="logout-button" onClick={handleOpen}>
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </nav>
      ) : (
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
            <NavLink to="/hotel" activeclassname="active">
              Hotel
            </NavLink>
            <NavLink to="/product" activeclassname="active">
              Shop
            </NavLink>
          </div>

          <div className="navbar-right">
            <i
              className="fa fa-user"
              ref={iconRef}
              onClick={toggleDropdown}
            ></i>
            {showDropdown && (
              <div className="dropdown" ref={dropdownRef}>
                {loggedin ? (
                  <>
                    <a href="/profile">Profile</a>
                    <a href="/findguide">Find Guide</a>
                    <a href="/localevents">Local Events</a>
                    <a href="/currencyexchange">Currency Exchange</a>
                    <a href="/translation">Translation</a>
                    <a href="/transportation">Transportation Services</a>
                    <a href="/traveltips">Travel Tips</a>
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
                    <a href="/findguide">Find Guide</a>
                    <a href="/localevents">Local Events</a>
                    <a href="/currencyexchange">Currency Exchange</a>
                    <a href="/translation">Translation</a>
                    <a href="/transportation">Transportation Services</a>
                    <a href="/traveltips">Travel Tips</a>
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
                    <span>{user.role}</span>
                  </div>
                  <a href="/profile">Profile</a>
                  <a href="/place">Place</a>
                  <a href="/guide">Guide</a>
                  <a href="/hotel">Hotels</a>
                  <a href="/product">Shop</a>
                  <a href="/findguide">Find Guide</a>
                  <a href="/localevents">Local Events</a>
                  <a href="/currencyexchange">Currency Exchange</a>
                  <a href="/translation">Translation</a>
                  <a href="/transportation">Transportation Services</a>
                  <a href="/traveltips">Travel Tips</a>
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
                  <a href="/hotel">Hotels</a>
                  <a href="/product">Shop</a>
                  <a href="/findguide">Find Guide</a>
                  <a href="/localevents">Local Events</a>
                  <a href="/currencyexchange">Currency Exchange</a>
                  <a href="/translation">Translation</a>
                  <a href="/transportation">Transportation Services</a>
                  <a href="/traveltips">Travel Tips</a>
                </>
              )}
            </div>
          )}
        </nav>
      )}

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
