import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const AdminHotels = () => {
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    const getHotels = async () => {
      let response = await fetch("http://127.0.1:8000/hotel/list");
      let parsedData = await response.json();
      let hotelData = parsedData;
      setHotel(hotelData);
    };
    getHotels();
    console.log(hotel);
  }, []);

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
                  <TableCell align="right">Latitude</TableCell>
                  <TableCell align="right">Longitude</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">No. of room</TableCell>
                  <TableCell align="right">Rating</TableCell>
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
                      <img src={hotel.image} alt="" srcset="" height={100} />
                    </TableCell>
                    <TableCell align="right">{hotel.name}</TableCell>
                    <TableCell align="right">{hotel.description}</TableCell>
                    <TableCell align="right">{hotel.latitude}</TableCell>
                    <TableCell align="right">{hotel.longitude}</TableCell>
                    <TableCell align="right">{hotel.address}</TableCell>
                    <TableCell align="right">{hotel.noOfRoom}</TableCell>
                    <TableCell align="right">{hotel.rating}</TableCell>
                    <TableCell align="right">{hotel.owner}</TableCell>
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

export default AdminHotels;
