import React, { useState, useEffect } from "react";
import "../Assets/styles/Styles.css";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { MenuItem, Select } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role === "admin") {
        swal(
          "Unauthorized Access",
          "You are not authorized to access this page",
          "error"
        );
        navigate("/login");
      }
    }
    setUser(parsedData);

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
    document.title = "TravelBuddy ● Profile";
  }, []);

  const [profile, setProfile] = useState("");

  const fetchData = async () => {
    let api = "http://127.0.1:8000/user/profile";
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();
    console.log(parsedData);

    if (data.status === 401) {
      navigate("/login");
    }
    setProfile(parsedData[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("oldpassword", password);
    formData.append("newpassword", newPassword);

    let response = await fetch("http://127.0.1:8000/user/password/change", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.status === 200) {
      swal("Success", "Password Changed", "success");
      setPassword("");
      setNewPassword("");
      handleClose();
    } else if (response.status === 400) {
      swal("Error", "Old password is incorrect", "error");
      setPassword("");
      setNewPassword("");
      handleClose();
    } else {
      swal("Error", "Failed to change password", "error");
      setPassword("");
      setNewPassword("");
      handleClose();
    }
  };

  const [userName, setUserName] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPreferredPlace, setUserPreferredPlace] = useState("");
  const [userImage, setUserImage] = useState("");

  const [guideName, setGuideName] = useState("");
  const [guidePhone, setGuidePhone] = useState("");
  const [guideDescription, setGuideDescription] = useState("");
  const [guideRating, setGuideRating] = useState("");
  const [guideCharge, setGuideCharge] = useState("");
  const [guideAddress, setGuideAddress] = useState("");
  const [guideTag, setGuideTag] = useState("");
  const [guideImage, setGuideImage] = useState("");

  const [sellerName, setSellerName] = useState("");
  const [sellerImage, setSellerImage] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    setUserName(profile.name);
    setUserCountry(profile.nationality);
    setUserAddress(profile.address);
    setUserPreferredPlace(profile.preferredplace);

    setGuideName(profile.name);
    setGuidePhone(profile.phone);
    setGuideDescription(profile.description);
    setGuideRating(profile.rating);
    setGuideCharge(profile.charge);
    setGuideAddress(profile.address);
    setGuideTag(profile.tag);

    setSellerName(profile.name);
  };

  const editProfile = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    if (user.role === "user") {
      formData.append("name", userName);
      formData.append("nationality", userCountry);
      formData.append("address", userAddress);
      formData.append("preferredplace", userPreferredPlace);
      formData.append("image", userImage);
    } else if (user.role === "guide") {
      formData.append("name", guideName);
      formData.append("phone", guidePhone);
      formData.append("description", guideDescription);
      formData.append("rating", guideRating);
      formData.append("charge", guideCharge);
      formData.append("address", guideAddress);
      formData.append("tag", guideTag);
      formData.append("image", guideImage);
    } else {
      formData.append("name", sellerName);
      formData.append("image", sellerImage);
    }

    let response = await fetch("http://127.0.1:8000/user/edit/profile", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.status === 200) {
      swal("Success", "Profile Updated", "success");
      fetchData();
      handleClose();
      setGuideImage("");
      setSellerImage("");
      setUserImage("");
    } else {
      swal("Error", "Failed to update profile", "error");
      handleClose();
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-header-image">
            <img src={profile.image} alt="profile" />
          </div>
          <h3>Welcome {profile.name}</h3>
        </div>

        <div className="profile-details">
          {user.role === "user" ? (
            <>
              <div className="profile-details-row">
                <p>Name</p>
                <p>{profile.name}</p>
              </div>
              <div className="profile-details-row">
                <p>Email</p>
                <p>{profile.email}</p>
              </div>
              <div className="profile-details-row">
                <p>Preferred Place</p>
                <p>{profile.preferredplace}</p>
              </div>
              <div className="profile-details-row">
                <p>Nationality</p>
                <p>{profile.nationality}</p>
              </div>
              <div className="profile-details-row">
                <p>Address</p>
                <p>{profile.address}</p>
              </div>
            </>
          ) : user.role === "guide" ? (
            <>
              <div className="profile-details-row">
                <p>Name</p>
                <p>{profile.name}</p>
              </div>
              <div className="profile-details-row">
                <p>Email</p>
                <p>{profile.email}</p>
              </div>
              <div className="profile-details-row">
                <p>Phone</p>
                <p>{profile.phone}</p>
              </div>
              <div className="profile-details-row">
                <p>Description</p>
                <p style={{ width: "60%" }}>{profile.description}</p>
              </div>
              <div className="profile-details-row">
                <p>Rating</p>
                <p>{profile.rating}</p>
              </div>
              <div className="profile-details-row">
                <p>Charge</p>
                <p>{profile.charge}</p>
              </div>
              <div className="profile-details-row">
                <p>Address</p>
                <p>{profile.address}</p>
              </div>
              <div className="profile-details-row">
                <p>Tag</p>
                <p>{profile.tag}</p>
              </div>
            </>
          ) : (
            <>
              <div className="profile-details-row">
                <p>Name</p>
                <p>{profile.name}</p>
              </div>
              <div className="profile-details-row">
                <p>Email</p>
                <p>{profile.email}</p>
              </div>
            </>
          )}

          <div
            className="profile-details-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <button style={{ backgroundColor: "#0D6FE5" }} onClick={handleOpen}>
              Change Password
            </button>
            <button onClick={handleOpenEdit}>Edit Profile</button>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Change Password
              </Typography>
              <br />
              <TextField
                id="outlined-basic"
                label="Old Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <DialogActions>
                <Button onClick={handleClose} variant="contained" color="error">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  autoFocus
                  onClick={changePassword}
                >
                  Change Password
                </Button>
              </DialogActions>
            </Box>
          </Modal>

          <Modal
            open={openEdit}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit profile
              </Typography>
              <br />
              {user.role === "user" ? (
                <>
                  Name
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  Email
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={profile.email}
                    disabled
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  Preferred Place
                  <Select
                    id="outlined-basic"
                    variant="outlined"
                    value={userPreferredPlace}
                    onChange={(e) => setUserPreferredPlace(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  >
                    <MenuItem value="natural">Natural</MenuItem>
                    <MenuItem value="cultural">Cultural</MenuItem>
                  </Select>
                  Country
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={userCountry}
                    onChange={(e) => setUserCountry(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  Address
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  Image
                  <TextField
                    id="outlined-basic"
                    type="file"
                    variant="outlined"
                    accept="image/*"
                    onChange={(e) => setUserImage(e.target.files[0])}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                </>
              ) : user.role === "guide" ? (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={guideName}
                    onChange={(e) => setGuideName(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={profile.email}
                    disabled
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    value={guidePhone}
                    onChange={(e) => setGuidePhone(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    value={guideDescription}
                    onChange={(e) => setGuideDescription(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Rating"
                    variant="outlined"
                    value={guideRating}
                    style={{ width: "100%", marginBottom: "10px" }}
                    disabled
                  />
                  <TextField
                    id="outlined-basic"
                    label="Charge"
                    value={guideCharge}
                    onChange={(e) => setGuideCharge(e.target.value)}
                    variant="outlined"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    value={guideAddress}
                    onChange={(e) => setGuideAddress(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  Tag
                  <Select
                    id="outlined-basic"
                    variant="outlined"
                    value={guideTag}
                    onChange={(e) => setGuideTag(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  >
                    <MenuItem value="natural">Natural</MenuItem>
                    <MenuItem value="cultural">Cultural</MenuItem>
                    <MenuItem value="historical">Historical</MenuItem>
                    <MenuItem value="adventure">Adventure</MenuItem>
                  </Select>
                  Image
                  <TextField
                    id="outlined-basic"
                    type="file"
                    variant="outlined"
                    accept="image/*"
                    onChange={(e) => setGuideImage(e.target.files[0])}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                </>
              ) : (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={profile.email}
                    disabled
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  Image
                  <TextField
                    id="outlined-basic"
                    type="file"
                    variant="outlined"
                    accept="image/*"
                    onChange={(e) => setSellerImage(e.target.files[0])}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                </>
              )}
              <DialogActions>
                <Button onClick={handleClose} variant="contained" color="error">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  autoFocus
                  onClick={editProfile}
                >
                  Save
                </Button>
              </DialogActions>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Profile;
