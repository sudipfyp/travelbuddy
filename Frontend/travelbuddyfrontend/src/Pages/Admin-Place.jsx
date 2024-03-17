import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const AdminPlace = () => {
  const [placeName, setPlaceName] = useState("");
  const [placeLocation, setPlaceLocation] = useState("");
  const [placeLatitude, setPlaceLatitude] = useState("");
  const [placeLongitude, setPlaceLongitude] = useState("");
  const [placeTag, setPlaceTag] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [placeImage, setPlaceImage] = useState("");

  const addPlace = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", placeName);
    formData.append("location", placeLocation);
    formData.append("latitude", placeLatitude);
    formData.append("longitude", placeLongitude);
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
  };
  const [place, setPlace] = useState([]);

  useEffect(() => {
    const getPlace = async () => {
      let response = await fetch("http://127.0.1:8000/place/list");
      let parsedData = await response.json();
      let placeData = parsedData;
      setPlace(placeData);
    };
    getPlace();
    console.log(place);
  }, []);

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
                    onChange={(e) => setPlaceLocation(e.target.value)}
                  />
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
                    onChange={(e) => setPlaceLatitude(e.target.value)}
                  />
                </div>

                <div className="place-row">
                  <label htmlFor="longitude">Longitude:</label>
                  <br />
                  <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    onChange={(e) => setPlaceLongitude(e.target.value)}
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
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Latitude</TableCell>
                  <TableCell align="right">Longitude</TableCell>
                  <TableCell align="right">Tag</TableCell>
                  <TableCell align="right">Description</TableCell>
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
                      <img src={place.image} alt="" srcset="" height={100} />
                    </TableCell>
                    <TableCell align="right">{place.name}</TableCell>
                    <TableCell align="right">{place.location}</TableCell>
                    <TableCell align="right">{place.latitude}</TableCell>
                    <TableCell align="right">{place.longitude}</TableCell>
                    <TableCell align="right">{place.tag}</TableCell>
                    <TableCell align="right">{place.description}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="success">
                        Edit
                      </Button>
                      <br />
                      <br />
                      <Button variant="outlined" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default AdminPlace;
