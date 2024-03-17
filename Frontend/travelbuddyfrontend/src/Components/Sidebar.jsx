import React, { useState, useEffect, Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Assets/images/logo.png";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Sidebar = () => {
  const navigate = useNavigate();
  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    if (data.status === 200) {
      console.log("User is logged in");
    }

    if (data.status === 403) {
      navigate("/login");
    }
  };

  useEffect(() => {
    document.title = "Travel Buddy ● Admin Panel";

    userCheck();
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = async () => {
    let response = await fetch("http://127.0.1:8000/user/logout", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 200) {
      alert("Logged out successfully");
      handleClose();
      navigate("/login");
    }
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-top-logo">
            <img src={Logo} alt="Travel Buddy" />
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-bottom-menu">
            <ul>
              <li>
                <NavLink to="/admin-dashboard">
                  <i class="fa-solid fa-home" /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-users">
                  <i class="fa-solid fa-users" /> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-place">
                  <i class="fa-solid fa-location-crosshairs" /> Places
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-shops">
                  <i class="fa-solid fa-shopping-bag" /> Shops
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-hotels">
                  <i class="fa-solid fa-bed" /> Hotels
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-localevents">
                  <i class="fa-solid fa-calendar" /> Local Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-transportation">
                  <i class="fa-solid fa-bus" /> Transportation
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="sidebar-bottom-logout">
            <button onClick={handleOpen}>
              <i className="fas fa-sign-out" /> Sign Out
            </button>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default Sidebar;
