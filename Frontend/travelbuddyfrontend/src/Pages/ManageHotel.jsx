import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Map from "../Components/Map";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import swal from "sweetalert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const ManageHotel = () => {
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
    document.title = "TravelBuddy ● Manage Hotel";
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

  const [hotel, setHotel] = useState("");

  const fetchHotel = async () => {
    let api = `http://127.0.1:8000/hotel/detail/${profile.id}`;
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();
    console.log(parsedData);

    if (data.status === 200) {
      setHotel(parsedData);
    }
  };

  useEffect(() => {
    if (profile.id) {
      fetchHotel();
    }
  }, [profile]);

  const [hotelName, setHotelName] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [hotelNoOfRoom, setHotelNoOfRoom] = useState("");
  const [hotelImage, setHotelImage] = useState("");

  const [open, setOpen] = useState(false);

  const [openmap, setOpenmap] = useState(false);

  const [location, setLocation] = useState(""); // State to hold location
  const [position, setPosition] = useState(""); // State to hold position
  const [district, setDistrict] = useState(""); // State to hold district

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
  };

  const handleDistrictChange = (newDistrict) => {
    setDistrict(newDistrict);
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
    setHotel(hotel);
    setHotelName(hotel.name);
    setHotelDescription(hotel.description);
    setPosition([hotel.latitude, hotel.longitude]);
    setLocation(hotel.location);
    setDistrict(hotel.address);
    setHotelNoOfRoom(hotel.noOfRoom);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const edit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", hotelName);
    formData.append("description", hotelDescription);
    formData.append("latitude", position[0]);
    formData.append("longitude", position[1]);
    formData.append("address", district);
    formData.append("location", location);
    formData.append("noOfRoom", hotelNoOfRoom);
    formData.append("image", hotelImage);

    let response = await fetch(`http://127.0.1:8000/hotel/edit/${hotel.id}`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Hotel Updated", "Hotel has been updated successfully", "success");
      setRefresh((prev) => !prev);
      setOpen(false);
    } else {
      swal("Error", "Something went wrong", "error");
    }
  };

  const [room, setRoom] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomPrice, setRoomPrice] = useState("");

  const addRoom = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    let response = await fetch("http://127.0.1:8000/hotel/room/add", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Room Added", "Room has been added successfully", "success");
      setRoomType("");
      setRoomPrice("");
      setRefresh((prev) => !prev);
    } else {
      swal("Error", "Something went wrong", "error");
    }
  };

  const fetchRoom = async () => {
    let api = `http://127.0.1:8000/hotel/room/list/${hotel.id}`;
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();
    console.log(parsedData);

    if (data.status === 200) {
      setRoom(parsedData);
    }
  }

  useEffect(() => {
    if (hotel.id) {
      fetchRoom();
    }
  }, [hotel]);

  return (
    <div>
      <Navbar />

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-header-image">
            <img src={hotel.image} alt="logo" />
          </div>
          <h2>
            Welcome <b>{hotel.name}</b>{" "}
          </h2>
        </div>

        <div className="profile-details">
          <div className="profile-details-row">
            <p>Name</p>
            <p>{hotel.name}</p>
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
            <p style={{ width: "60%" }}>{hotel.description}</p>
          </div>
          <div className="profile-details-row">
            <p>Address</p>
            <p style={{ width: "60%" }}>{hotel.location}</p>
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

        <hr />

        <div className="add-place-container">
          <form className="add-place-form" onSubmit={addRoom}>
            <h2>Add Room Type</h2>
            <br />

            <div className="place-column">
              <div className="place-row">
                <label htmlFor="name">Type</label>
                <input
                  type="text"
                  id="name"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                />
              </div>

              <div className="place-row">
                <label htmlFor="name">Price</label>
                <input
                  type="text"
                  id="name"
                  value={roomPrice}
                  onChange={(e) => setRoomPrice(e.target.value)}
                />
              </div>
            </div>
            <input type="submit" value="Add Room" />
          </form>
        </div>

        <br />
        <br />

        <TableContainer component={Paper}>
          <Table
            sx={{ maxWidth: 900 }}
            aria-label="simple table"
            style={{ margin: "auto" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Place ID</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {room && room.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.roomType}</TableCell>
                  <TableCell align="right">{row.roomPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Hotel</DialogTitle>
        <DialogContent>
          {hotel && (
            <>
              Hotel Name
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                fullWidth
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
              Description
              <TextField
                margin="dense"
                id="description"
                type="text"
                fullWidth
                value={hotelDescription}
                onChange={(e) => setHotelDescription(e.target.value)}
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
                    onDistrictChange={handleDistrictChange}
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
              District
              <TextField
                margin="dense"
                id="address"
                type="text"
                fullWidth
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled
              />
              No. of Room
              <TextField
                margin="dense"
                id="noOfRoom"
                type="text"
                fullWidth
                value={hotelNoOfRoom}
                onChange={(e) => setHotelNoOfRoom(e.target.value)}
              />
              Owner
              <TextField
                margin="dense"
                id="owner"
                type="text"
                fullWidth
                value={hotel.owner.name}
                disabled
              />
              Image
              <TextField
                margin="dense"
                id="image"
                type="file"
                fullWidth
                onChange={(e) => setHotelImage(e.target.files[0])}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={edit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};

export default ManageHotel;
