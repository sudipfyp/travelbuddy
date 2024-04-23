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

const AdminShops = () => {
  const [shop, setShop] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
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
    const getShops = async () => {
      let response = await fetch("http://localhost:8000/shop/list");
      let parsedData = await response.json();
      let shopData = parsedData;

      if (shopData.length > 0) {
        setShop(shopData);
      }
    };
    getShops();
  }, [refresh]);

  const handleClickOpen = (shop) => {
    setSelectedShop(shop);
    setShopName(shop.name);
    setShopDescription(shop.description);
    setLocation(shop.address);
    setPosition([shop.latitude, shop.longitude]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDel(false);
  };

  const handleOpen = (shop) => {
    setSelectedShop(shop);
    setOpenDel(true);
  };

  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shopImage, setShopImage] = useState("");

  const edit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", shopName);
    formData.append("description", shopDescription);
    formData.append("image", shopImage);
    formData.append("address", location);
    formData.append("latitude", position[0]);
    formData.append("longitude", position[1]);
    formData.append("image", shopImage);

    let response = await fetch(
      `http://127.0.0.1:8000/shop/edit/${selectedShop.id}`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Success", "Shop Edited Successfully", "success");
      setRefresh((prev) => !prev);
      setOpen(false);
    } else {
      swal("Error", "Something went wrong", "error");
    }
  };

  const handleDelete = async (shop) => {
    let response = await fetch(`http://127.0.0.1:8000/shop/delete/${shop.id}`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Success", "Shop Deleted Successfully", "success");
      setRefresh((prev) => !prev);
      setOpenDel(false);
    } else {
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
                  <TableCell>Shop ID</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Latitude</TableCell>
                  <TableCell align="right">Longitude</TableCell>
                  <TableCell align="right">Owner</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shop.length > 0 ? (
                  shop.map((shop) => (
                    <TableRow
                      key={shop.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {shop.id}
                      </TableCell>
                      <TableCell align="right">
                        <img src={shop.image} alt="" height={100} />
                      </TableCell>
                      <TableCell align="right">{shop.name}</TableCell>
                      <TableCell align="right">{shop.description}</TableCell>
                      <TableCell align="right">{shop.address}</TableCell>
                      <TableCell align="right">{shop.latitude}</TableCell>
                      <TableCell align="right">{shop.longitude}</TableCell>
                      <TableCell align="right">{shop.owner.name}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => handleClickOpen(shop)}
                        >
                          Edit
                        </Button>
                        <br />
                        <br />
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpen(shop)}
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
            <DialogTitle id="form-dialog-title">Edit Shop</DialogTitle>
            <DialogContent>
              {selectedShop && (
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Hotel Name"
                    type="text"
                    fullWidth
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    value={shopDescription}
                    onChange={(e) => setShopDescription(e.target.value)}
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
                    id="owner"
                    label="Owner"
                    type="text"
                    fullWidth
                    value={selectedShop.owner.name}
                    disabled
                  />
                  Image
                  <TextField
                    margin="dense"
                    id="image"
                    type="file"
                    accept="image/*"
                    fullWidth
                    onChange={(e) => setShopImage(e.target.files[0])}
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
                    handleDelete(selectedShop);
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

export default AdminShops;
