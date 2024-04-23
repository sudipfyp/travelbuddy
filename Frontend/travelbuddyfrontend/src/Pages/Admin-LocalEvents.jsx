import React, { useState, useEffect, Fragment } from "react";
import Sidebar from "../Components/Sidebar";
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
import swal from "sweetalert";
import { MenuItem, Select } from "@mui/material";

const AdminLocalEvents = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventTag, setEventTag] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [event, setEvent] = useState([]);

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const addEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", eventName);
    formData.append("description", eventDescription);
    formData.append("startdate", eventStartDate);
    formData.append("enddate", eventEndDate);
    formData.append("location", eventLocation);
    formData.append("tag", eventTag);
    formData.append("image", eventImage);

    let response = await fetch("http://127.0.1:8000/event/add", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Event Added Successfully!", "", "success");
      setRefresh((prev) => !prev);
      setEventName("");
      setEventDescription("");
      setEventStartDate("");
      setEventEndDate("");
      setEventLocation("");
      setEventTag("");
    } else {
      swal("Failed to Add Event!", "", "error");
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      let response = await fetch("http://127.0.1:8000/event/list");
      let parsedData = await response.json();
      let eventData = parsedData;

      if (eventData.length > 0) {
        setEvent(eventData);
      }
    };
    getEvent();
  }, [refresh]);

  const handleClickOpen = (event) => {
    setSelectedEvent(event);
    setEventName(event.name);
    setEventDescription(event.description);
    setEventStartDate(event.startdate);
    setEventEndDate(event.enddate);
    setEventLocation(event.location);
    setEventTag(event.tag);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDel(false);
  };

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpenDel(true);
  };

  const edit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", eventName);
    formData.append("description", eventDescription);
    formData.append("startdate", eventStartDate);
    formData.append("enddate", eventEndDate);
    formData.append("location", eventLocation);
    formData.append("tag", eventTag);
    formData.append("image", eventImage);

    let response = await fetch(
      `http://127.0.1:8000/event/update/${selectedEvent.id}`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Event Updated Successfully!", "", "success");
      setEventImage("");
      setRefresh((prev) => !prev);
      setOpen(false);
    } else {
      swal("Failed to Update Event!", "", "error");
    }
  };

  const handleDelete = async (event) => {
    let response = await fetch(
      `http://127.0.1:8000/event/delete/${selectedEvent.id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Event Deleted Successfully!", "", "success");
      setRefresh((prev) => !prev);
    } else {
      swal("Failed to Delete Event!", "", "error");
    }
  };

  return (
    <>
      <div className="admin-container">
        <div className="admin-left">
          <Sidebar />
        </div>

        <div className="admin-right">
          <div className="add-place-container">
            <form className="add-place-form" onSubmit={addEvent}>
              <h2>Add Event</h2>
              <br />

              <div className="place-column">
                <div className="place-row">
                  <label htmlFor="name">Name:</label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                  />
                </div>

                <div className="place-row">
                  <label htmlFor="location">Location:</label>
                  <br />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="place-column">
                <div className="place-row">
                  <label htmlFor="start">Start Date:</label>
                  <br />
                  <input
                    type="date"
                    id="startdate"
                    name="startdate"
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                    required
                  />
                </div>

                <div className="place-row">
                  <label htmlFor="end">End Date:</label>
                  <br />
                  <input
                    type="date"
                    id="enddate"
                    name="enddate"
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="place-column">
                <div className="place-row">
                  <label htmlFor="tag">Tag:</label>
                  <br />
                  <select
                    required
                    id="tag"
                    name="tag"
                    value={eventTag}
                    onChange={(e) => setEventTag(e.target.value)}
                  >
                    <option disabled>Select tag</option>
                    <option value="popular">Popular</option>
                    <option value="cultural">Cultural</option>
                  </select>
                </div>

                <div className="place-row">
                  <label htmlFor="image">Image:</label>
                  <br />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEventImage(e.target.files[0])}
                    required
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
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />

              <input type="submit" value="Add Event" />
            </form>
          </div>

          <br />
          <br />
          <h2>Local Events Information</h2>
          <br />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Event ID</TableCell>
                  <TableCell align="right">Event Image</TableCell>
                  <TableCell align="right">Event Name</TableCell>
                  <TableCell align="right">Event Location</TableCell>
                  <TableCell align="right">Event Start Date</TableCell>
                  <TableCell align="right">Event End Date</TableCell>
                  <TableCell align="right">Event Tag</TableCell>
                  <TableCell align="right">Event Description</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {event.length > 0 ? (
                  event.map((event) => (
                    <TableRow
                      key={event.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {event.id}
                      </TableCell>
                      <TableCell align="right">
                        <img src={event.image} alt="" srcSet="" height={100} />
                      </TableCell>
                      <TableCell align="right">{event.name}</TableCell>
                      <TableCell align="right">{event.location}</TableCell>
                      <TableCell align="right">{event.startdate}</TableCell>
                      <TableCell align="right">{event.enddate}</TableCell>
                      <TableCell align="right">{event.tag}</TableCell>
                      <TableCell align="right">{event.description}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => {
                            handleClickOpen(event);
                          }}
                        >
                          Edit
                        </Button>
                        <br />
                        <br />
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpen(event)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={9}>
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit Local Events</DialogTitle>
            <DialogContent>
              {selectedEvent && (
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Description"
                    type="text"
                    fullWidth
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="location"
                    label="Location"
                    type="text"
                    fullWidth
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="startdate"
                    label="Start Date"
                    type="date"
                    fullWidth
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="enddate"
                    label="End Date"
                    type="date"
                    fullWidth
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                  />
                  Tag
                  <Select
                    margin="dense"
                    id="tag"
                    value={eventTag}
                    fullWidth
                    onChange={(e) => setEventTag(e.target.value)}
                  >
                    <MenuItem value="popular">Popular</MenuItem>
                    <MenuItem value="cultural">Cultural</MenuItem>
                  </Select>
                  Image
                  <TextField
                    margin="dense"
                    id="image"
                    type="file"
                    fullWidth
                    accept="image/*"
                    onChange={(e) => setEventImage(e.target.files[0])}
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
                    handleDelete(selectedEvent);
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

export default AdminLocalEvents;
