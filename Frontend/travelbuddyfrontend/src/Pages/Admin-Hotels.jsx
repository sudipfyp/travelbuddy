import React, { useState, useEffect, Fragment } from "react";
import Sidebar from "../Components/Sidebar";
import Map from "../Components/Map";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import swal from "sweetalert";

const AdminHotels = () => {
  const [hotel, setHotel] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [refresh, setRefresh] = useState(false);

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

  useEffect(() => {
    const getHotels = async () => {
      let response = await fetch("http://127.0.1:8000/hotel/list");
      let parsedData = await response.json();
      let hotelData = parsedData;
      setHotel(hotelData);
    };
    getHotels();
  }, [refresh]);

  const handleClickOpen = (hotel) => {
    setSelectedHotel(hotel);
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
    setOpenDel(false);
  };

  const handleOpen = (hotel) => {
    setSelectedHotel(hotel);
    setOpenDel(true);
  };

  const [hotelName, setHotelName] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [hotelNoOfRoom, setHotelNoOfRoom] = useState("");
  const [hotelImage, setHotelImage] = useState("");

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

    let response = await fetch(
      `http://127.0.1:8000/hotel/edit/${selectedHotel.id}`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
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

  const handleDelete = async (hotel) => {
    let response = await fetch(
      `http://127.0.1:8000/hotel/delete/${selectedHotel.id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Hotel Deleted", "Hotel has been deleted successfully", "success");
      setRefresh((prev) => !prev);
    } else {
      console.log(parsedData);
      swal("Error", "Something went wrong", "error");
    }
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

  return (
    <>
      <div className="admin-container">
        <div className="admin-left">
          <Sidebar />
        </div>

        <div className="admin-right">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Hotel ID</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Latitude</TableCell>
                  <TableCell align="right">Longitude</TableCell>
                  <TableCell align="right">District</TableCell>
                  <TableCell align="right">No. of room</TableCell>
                  <TableCell align="right">Owner</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hotel.map((hotel) => (
                  <TableRow
                    key={hotel.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {hotel.id}
                    </TableCell>
                    <TableCell align="right">
                      <img src={hotel.image} alt="" height={100} />
                    </TableCell>
                    <TableCell align="right">{hotel.name}</TableCell>
                    <TableCell align="right">{hotel.description}</TableCell>
                    <TableCell align="right">{hotel.location}</TableCell>
                    <TableCell align="right">{hotel.latitude}</TableCell>
                    <TableCell align="right">{hotel.longitude}</TableCell>
                    <TableCell align="right">{hotel.address}</TableCell>
                    <TableCell align="right">{hotel.noOfRoom}</TableCell>
                    <TableCell align="right">{hotel.owner.name}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handleClickOpen(hotel)}
                      >
                        Edit
                      </Button>
                      <br />
                      <br />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpen(hotel)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit Hotel</DialogTitle>
            <DialogContent>
              {selectedHotel && (
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Hotel Name"
                    type="text"
                    fullWidth
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    value={hotelDescription}
                    onChange={(e) => setHotelDescription(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="location"
                    label="Location"
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
                  <TextField
                    margin="dense"
                    id="latitude"
                    label="Latitude"
                    type="text"
                    fullWidth
                    value={position[0]}
                    onChange={(e) => setPosition([e.target.value, position[1]])}
                    disabled
                  />
                  <TextField
                    margin="dense"
                    id="longitude"
                    label="Longitude"
                    type="text"
                    fullWidth
                    value={position[1]}
                    onChange={(e) => setPosition([position[0], e.target.value])}
                    disabled
                  />
                  <TextField
                    margin="dense"
                    id="address"
                    label="District"
                    type="text"
                    fullWidth
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled
                  />
                  <TextField
                    margin="dense"
                    id="noOfRoom"
                    label="No. of Room"
                    type="text"
                    fullWidth
                    value={hotelNoOfRoom}
                    onChange={(e) => setHotelNoOfRoom(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="owner"
                    label="Owner"
                    type="text"
                    fullWidth
                    value={selectedHotel.owner.name}
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

          <Fragment>
            <Dialog
              open={openDel}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Delete?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to Delete?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  No
                </Button>
                <Button
                  autoFocus
                  onClick={() => {
                    handleDelete(selectedHotel);
                    handleClose();
                  }}
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>
        </div>
      </div>
    </>
  );
};

export default AdminHotels;
