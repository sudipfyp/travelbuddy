import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Map from "../Components/Map";

import swal from "sweetalert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const ManageShop = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [refresh, setRefresh] = useState(false);

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role !== "seller") {
        swal(
          "Unauthorized Access",
          "You are not authorized to access this page",
          "error"
        );
        navigate("/login");
      }
      setUser(parsedData);
    }

    if (data.status === 403) {
      swal(
        "Unauthorized Access",
        "You are not authorized to access this page",
        "error"
      );
      navigate("/login");
    }
  };

  useEffect(() => {
    userCheck();
    document.title = "TravelBuddy ● Manage Shop";
  }, []);

  const [profile, setProfile] = useState("");

  const fetchData = async () => {
    let api = "http://127.0.1:8000/user/profile";
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 401) {
      navigate("/login");
    }
    setProfile(parsedData[0]);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const [shop, setShop] = useState("");

  const fetchShop = async () => {
    let api = `http://127.0.1:8000/shop/detail/${profile.id}`;
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();
    console.log(parsedData);

    if (data.status === 200) {
      setShop(parsedData[0]);
    }
  };

  useEffect(() => {
    if (profile.id) {
      fetchShop();
    }
  }, [profile]);

  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shopLogo, setShopLogo] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");

  const [open, setOpen] = useState(false);

  const [openmap, setOpenmap] = useState(false);

  const [location, setLocation] = useState(""); // State to hold location
  const [position, setPosition] = useState(""); // State to hold position

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
  };

  const handleMapOpen = () => {
    setOpenmap(true);
  };

  const handleMapClose = () => {
    setOpenmap(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleClickOpen = () => {
    setShopName(shop.name);
    setShopDescription(shop.description);
    setOwner(shop.owner.name);
    setEmail(shop.owner.email);
    setLocation(shop.address);
    setPosition([shop.latitude, shop.longitude]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editShop = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", shopName);
    formData.append("description", shopDescription);
    formData.append("latitude", position[0]);
    formData.append("longitude", position[1]);
    formData.append("address", location);
    formData.append("image", shopLogo);

    let response = await fetch(`http://127.0.0.1:8000/shop/edit/${shop.id}`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Success", "Shop edited Successfully", "success");
      setRefresh((prev) => !prev);
      handleClose();
    } else {
      swal("Error", "Failed to edit Shop", "error");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-header-image">
            <img src={shop.image} alt="logo" />
          </div>
          <h2>
            Welcome <b>{shop.name}</b>{" "}
          </h2>
        </div>

        <div className="profile-details">
          <div className="profile-details-row">
            <p>Name</p>
            <p>{shop.name}</p>
          </div>
          <div className="profile-details-row">
            <p>Owner</p>
            <p>{profile.name}</p>
          </div>
          <div className="profile-details-row">
            <p>Email</p>
            <p>{profile.email}</p>
          </div>
          <div className="profile-details-row">
            <p>Description</p>
            <p style={{ width: "60%" }}>{shop.description}</p>
          </div>
          <div className="profile-details-row">
            <p>Address</p>
            <p style={{ width: "60%" }}>{shop.address}</p>
          </div>
          <div className="profile-details-row">
            <button
              onClick={() => {
                handleClickOpen();
              }}
              className="edit"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Shop Details</DialogTitle>
        <DialogContent>
          {shop && (
            <>
              Shop Name
              <TextField
                margin="dense"
                id="name"
                type="text"
                fullWidth
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
              Description
              <TextField
                margin="dense"
                id="description"
                type="text"
                fullWidth
                value={shopDescription}
                onChange={(e) => setShopDescription(e.target.value)}
              />
              Owner
              <TextField
                margin="dense"
                id="owner"
                type="text"
                fullWidth
                value={owner}
                disabled
              />
              Email
              <TextField
                margin="dense"
                id="email"
                type="email"
                fullWidth
                value={email}
                disabled
              />
              Location
              <TextField
                margin="dense"
                id="location"
                type="text"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button
                onClick={() => {
                  handleMapOpen();
                }}
              >
                Locate on map
              </Button>
              <Modal
                open={openmap}
                onClose={handleMapClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Map
                    onLocationChange={handleLocationChange}
                    onPositionChange={handlePositionChange}
                  />
                </Box>
              </Modal>
              <br />
              Latitude
              <TextField
                margin="dense"
                id="latitude"
                type="text"
                fullWidth
                value={position[0]}
                onChange={(e) => setPosition([e.target.value, position[1]])}
                disabled
              />
              Longitude
              <TextField
                margin="dense"
                id="longitude"
                type="text"
                fullWidth
                value={position[1]}
                onChange={(e) => setPosition([position[0], e.target.value])}
                disabled
              />              
              Image
              <TextField
                margin="dense"
                id="image"
                type="file"
                fullWidth
                onChange={(e) => setShopLogo(e.target.files[0])}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editShop} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};

export default ManageShop;
