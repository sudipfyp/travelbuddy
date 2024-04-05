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

const AdminPlace = () => {
  const [placeName, setPlaceName] = useState("");
  const [placeLocation, setPlaceLocation] = useState("");
  const [placeLatitude, setPlaceLatitude] = useState("");
  const [placeLongitude, setPlaceLongitude] = useState("");
  const [placeTag, setPlaceTag] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [placeImage, setPlaceImage] = useState("");
  const [place, setPlace] = useState([]);

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openmap, setOpenmap] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [refresh, setRefresh] = useState(false);


  const addPlace = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", placeName);
    formData.append("location", location);
    formData.append("district", district);
    formData.append("latitude", position[0]);
    formData.append("longitude", position[1]);
    formData.append("tag", placeTag);
    formData.append("description", placeDescription);
    formData.append("image", placeImage);


    let response = await fetch("http://127.0.1:8000/place/add/", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    let parsedData = await response.json();
    console.log(parsedData);
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const getPlace = async () => {
      let response = await fetch("http://127.0.1:8000/place/list/");
      let parsedData = await response.json();
      let placeData = parsedData;
      setPlace(placeData);
    };
    getPlace();
  }, [refresh]);

  const handleClickOpen = (place) => {
    setSelectedPlace(place);
    setPlaceName(place.name);
    setPlaceLocation(place.location);
    setPlaceLatitude(place.latitude);
    setPlaceLongitude(place.longitude);
    setPlaceTag(place.tag);
    setPlaceDescription(place.description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDel(false);
    setOpenmap(false);
  };

  const handleOpen = (place) => {
    setSelectedPlace(place);
    setOpenDel(true);
  };

  const edit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", placeName);
    formData.append("location", placeLocation);
    formData.append("latitude", placeLatitude);
    formData.append("longitude", placeLongitude);
    formData.append("tag", placeTag);
    formData.append("description", placeDescription);
    // formData.append("image", placeImage);

    let response = await fetch(
      `http://127.0.1:8000/place/edit/${selectedPlace.id}/`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    let parsedData = await response.json();
    console.log(parsedData);
    setRefresh((prev) => !prev);
    setOpen(false);
  };

  const handleDelete = async (place) => {
    let response = await fetch(
      `http://127.0.1:8000/place/delete/${place.id}/`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    let parsedData = await response.json();
    console.log(parsedData);
    setRefresh((prev) => !prev);
  };

  const handleMapOpen = () => {
    setOpenmap(true);
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


  return (
    <>
      <div className="admin-container">
        <div className="admin-left">
          <Sidebar />
        </div>

        <div className="admin-right">
          <div className="add-place-container">
            <form className="add-place-form" onSubmit={addPlace}>
              <h2>Add Place</h2>
              <br />

              <div className="place-column">
                <div className="place-row">
                  <label htmlFor="name">Name:</label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => setPlaceName(e.target.value)}
                  />
                </div>

                <div className="place-row">
                  <label htmlFor="location">Location:</label>
                  <br />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={location}
                    onChange={(e) => setPlaceLocation(e.target.value)}
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
                    onClose={handleClose}
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
                </div>
              </div>

              <div className="place-column">
                <div className="place-row">
                  <label htmlFor="latitude">Latitude:</label>
                  <br />
                  <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    defaultValue={position[0]}
                    onChange={(e) => setPlaceLatitude(e.target.value)}
                    disabled
                  />
                </div>

                <div className="place-row">
                  <label htmlFor="longitude">Longitude:</label>
                  <br />
                  <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={position[1]}
                    onChange={(e) => setPlaceLongitude(e.target.value)}
                    disabled
                  />
                </div>
              </div>

              <div className="place-column">
                <div className="place-row">
                  <label htmlFor="tag">Tag:</label>
                  <br />
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    onChange={(e) => setPlaceTag(e.target.value)}
                  />
                </div>

                <div className="place-row">
                  <label htmlFor="image">Image:</label>
                  <br />
                  <input
                    type="file"
                    onChange={(e) => setPlaceImage(e.target.files[0])}
                  />
                  <br />
                </div>
              </div>

              <label htmlFor="description">Description:</label>
              <br />
              <textarea
                type="text"
                id="description"
                name="description"
                onChange={(e) => setPlaceDescription(e.target.value)}
              />

              <input type="submit" value="Add place" />
            </form>
          </div>

          <br />
          <br />
          <h2>Places Information</h2>
          <br />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Place ID</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">District</TableCell>
                  <TableCell align="right">Latitude</TableCell>
                  <TableCell align="right">Longitude</TableCell>
                  <TableCell align="right">Tag</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {place.map((place) => (
                  <TableRow
                    key={place.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {place.id}
                    </TableCell>
                    <TableCell align="right">
                      <img src={place.image} alt="" srcSet="" height={100} />
                    </TableCell>
                    <TableCell align="right">{place.name}</TableCell>
                    <TableCell align="right">{place.description}</TableCell>
                    <TableCell align="right">{place.location}</TableCell>
                    <TableCell align="right">{place.district}</TableCell>
                    <TableCell align="right">{place.latitude}</TableCell>
                    <TableCell align="right">{place.longitude}</TableCell>
                    <TableCell align="right">{place.tag}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handleClickOpen(place)}
                      >
                        Edit
                      </Button>
                      <br />
                      <br />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpen(place)}
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
            <DialogTitle id="form-dialog-title">Edit Place</DialogTitle>
            <DialogContent>
              {selectedPlace && (
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="location"
                    label="Location"
                    type="text"
                    fullWidth
                    value={placeLocation}
                    onChange={(e) => setPlaceLocation(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="latitude"
                    label="Latitude"
                    type="text"
                    fullWidth
                    value={placeLatitude}
                    onChange={(e) => setPlaceLatitude(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="longitude"
                    label="Longitude"
                    type="text"
                    fullWidth
                    value={placeLongitude}
                    onChange={(e) => setPlaceLongitude(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="tag"
                    label="Tag"
                    type="text"
                    fullWidth
                    value={placeTag}
                    onChange={(e) => setPlaceTag(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="textarea"
                    fullWidth
                    value={placeDescription}
                    onChange={(e) => setPlaceDescription(e.target.value)}
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
                    handleDelete(selectedPlace);
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

export default AdminPlace;
