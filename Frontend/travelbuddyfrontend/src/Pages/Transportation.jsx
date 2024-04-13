import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const transportData = [
  {
    id: 1,
    startpoint: "Thankot",
    endpoint: "RNAC",
    stops: "Kalanki, Kalimati, Tripureshwor",
    vehicle: "Chandragiri Yatayat",
    vehicletype: "Bus",
  },
  {
    id: 2,
    startpoint: "Kalanki",
    endpoint: "RNAC",
    stops: "Kalimati, Tripureshwor",
    vehicle: "-",
    vehicletype: "Micro (Blue)",
  },
  {
    id: 3,
    startpoint: "Kritipur",
    endpoint: "RNAC",
    stops: "Balkhu, Kalimati, Tripureshwor",
    vehicle: "Kritipur Yatayat",
    vehicletype: "Bus, Micro",
  },
  {
    id: 4,
    startpoint: "Chabahil",
    endpoint: "Chabahil",
    stops:
      "Balaju, Swayambhu, Kalanki, Kalimati, Tripureshwor, RNAC, Jamal, Kamalpokhari, Kalopul, Gaushala",
    vehicle: "Samyukta Yatayat",
    vehicletype: "Bus",
  },
];

const Transportation = () => {
  document.title = "TravelBuddy ● Transportation";

  const [transport, setTransport] = useState(transportData);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const filteredRoutes = transport.filter(
    (transport) =>
      (transport.startpoint.toLowerCase().includes(searchTerm1.toLowerCase()) &&
        transport.endpoint.toLowerCase().includes(searchTerm2.toLowerCase())) ||
      (transport.stops.toLowerCase().includes(searchTerm1.toLowerCase()) &&
        transport.endpoint.toLowerCase().includes(searchTerm2.toLowerCase())) ||
      (transport.startpoint.toLowerCase().includes(searchTerm1.toLowerCase()) &&
        transport.stops.toLowerCase().includes(searchTerm2.toLowerCase())) ||
      (transport.stops.toLowerCase().includes(searchTerm1.toLowerCase()) &&
        transport.stops.toLowerCase().includes(searchTerm2.toLowerCase())) ||
      (transport.startpoint.toLowerCase().includes(searchTerm1.toLowerCase()) &&
        transport.startpoint
          .toLowerCase()
          .includes(searchTerm2.toLowerCase())) ||
      (transport.stops.toLowerCase().includes(searchTerm1.toLowerCase()) &&
        transport.startpoint
          .toLowerCase()
          .includes(searchTerm2.toLowerCase())) ||
      (transport.endpoint.toLowerCase().includes(searchTerm1.toLowerCase()) &&
        transport.stops.toLowerCase().includes(searchTerm2.toLowerCase())) ||
      (transport.endpoint.toLowerCase().includes(searchTerm1.toLowerCase()) &&
        transport.startpoint.toLowerCase().includes(searchTerm2.toLowerCase()))
  );
  return (
    <>
      <Navbar />

      <div className="static-header">
        <h1>Local Transportation Information</h1>
      </div>

      <div className="common-container">
        <div className="common-header" style={{marginBottom: '0px'}}>
          <div className="common-headline" >
            <h1>Search your destination!</h1>
          </div>
        </div>

        <div className="transport-container">
          <TextField
            variant="outlined"
            placeholder="Your Location"
            type="search"
            onChange={(e) => setSearchTerm1(e.target.value)}
          />
          <br />
          <TextField
            variant="outlined"
            placeholder="Destination"
            type="search"
            onChange={(e) => setSearchTerm2(e.target.value)}
          />
        </div>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Start Point</TableCell>
                <TableCell>End Point</TableCell>
                <TableCell>Stops</TableCell>
                <TableCell>Service Provider</TableCell>
                <TableCell>Vehicle Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRoutes && filteredRoutes.length > 0 ? (
                filteredRoutes.map((transport) => (
                  <TableRow key={transport.id}>
                    <TableCell width={"15%"}>{transport.startpoint}</TableCell>
                    <TableCell width={"15%"}>{transport.endpoint}</TableCell>
                    <TableCell width={"35%"}>{transport.stops}</TableCell>
                    <TableCell width={"20%"}>{transport.vehicle}</TableCell>
                    <TableCell width={"15%"}>{transport.vehicletype}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={5}>No Such Route Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Footer />
    </>
  );
};

export default Transportation;
