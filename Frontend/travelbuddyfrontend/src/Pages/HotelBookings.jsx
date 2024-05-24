import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import swal from "sweetalert";

const Bookings = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role !== "user") {
        swal(
          "Unauthorized Access",
          "You are not authorized to access this page",
          "error"
        );
        navigate("/login");
      }
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
    document.title = "Travel Buddy ● Hotel Bookings";
  }, []);

  const [hotelBookings, setHotelBookings] = useState([]);
  const [currentHotel, setCurrentHotel] = useState([]);

  const listHotelBookings = async () => {
    let response = await fetch("http://127.0.1:8000/hotel/room/booking/user", {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      const current = data.filter((req) => req.status === "pending");
      setHotelBookings(current);

      const past = data.filter((req) => req.status === "accept");
      setCurrentHotel(past);
    }
  };

  useEffect(() => {
    listHotelBookings();
  }, [refresh]);

  const rejectRequest = async (id) => {
    let response = await fetch(
      `http://127.0.1:8000/hotel/user/room/cancel/${id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      swal("Success", "Cancelled Successfully", "success");
      setRefresh((prev) => !prev);
    } else {
      swal("Error", "Something went wrong", "error");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="static-header">
        <h1>Hotel Booking Details</h1>
      </div>

      <div className="static-container">
        <div className="static-contain">
          <h2>Pending Bookings</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>Hotel Name</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Address</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>
                    CheckIn Date
                  </TableCell>
                  <TableCell style={{ color: "#02cea4" }}>
                    CheckOut Date
                  </TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Amount</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Status</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {hotelBookings.length === 0 ? (
                  <TableRow>
                    <TableCell align="center" colSpan={8}>
                      No Pending Bookings
                    </TableCell>
                  </TableRow>
                ) : (
                  hotelBookings.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.room.hotel.name}</TableCell>
                      <TableCell>{item.room.hotel.address}</TableCell>
                      <TableCell>{item.checkIn}</TableCell>
                      <TableCell>{item.checkOut}</TableCell>
                      <TableCell>
                        Rs.{" "}
                        {Math.floor(
                          (new Date(item.checkOut) - new Date(item.checkIn)) /
                            (1000 * 60 * 60 * 24)
                        ) === 0
                          ? item.room.roomPrice
                          : Math.floor(
                              (new Date(item.checkOut) -
                                new Date(item.checkIn)) /
                                (1000 * 60 * 60 * 24)
                            ) * item.room.roomPrice}
                      </TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          className="blue btn"
                          onClick={() => {
                            navigate(`/chat/${item.room.hotel.owner.id}/seller`);
                          }}
                        >
                          Chat
                        </button>
                        <button
                          className="red btn"
                          onClick={() => rejectRequest(item.id)}
                          style={{ marginTop: "5px" }}
                        >
                          Cancel
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <h2>Current Bookings</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>Hotel Name</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Address</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>
                    CheckIn Date
                  </TableCell>
                  <TableCell style={{ color: "#02cea4" }}>
                    CheckOut Date
                  </TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Room Type</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Amount</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Status</TableCell>
                  <TableCell colSpan={2} style={{ color: "#02cea4" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {currentHotel.length === 0 ? (
                  <TableCell align="center" colSpan={8}>
                    No Bookings Currently
                  </TableCell>
                ) : (
                  currentHotel.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.room.hotel.name}</TableCell>
                      <TableCell>{item.room.hotel.address}</TableCell>
                      <TableCell>{item.checkIn}</TableCell>
                      <TableCell>{item.checkOut}</TableCell>
                      <TableCell>{item.room.roomType}</TableCell>
                      <TableCell>
                        Rs.{" "}
                        {Math.floor(
                          (new Date(item.checkOut) - new Date(item.checkIn)) /
                            (1000 * 60 * 60 * 24)
                        ) === 0
                          ? item.room.roomPrice
                          : Math.floor(
                              (new Date(item.checkOut) -
                                new Date(item.checkIn)) /
                                (1000 * 60 * 60 * 24)
                            ) * item.room.roomPrice}
                      </TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell colSpan={2}>
                        <button
                          className="blue btn"
                          onClick={() => {
                            navigate(`/chat/${item.room.hotel.owner.id}/seller`);
                          }}
                        >
                          Chat
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Bookings;
