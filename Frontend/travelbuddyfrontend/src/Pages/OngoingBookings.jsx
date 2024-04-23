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

const OngoingBookings = () => {
  const navigate = useNavigate();

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
    document.title = "Travel Buddy ● Ongoing Hirings";
  }, []);

  const [bookings, setBookings] = useState([]);

  const listBookings = async () => {
    let response = await fetch(
      "http://127.0.1:8000/hotel/room/booking/seller",
      {
        method: "GET",
        credentials: "include",
      }
    );

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      const current = data.filter((req) => req.status === "accept");
      setBookings(current);
    }
  };

  useEffect(() => {
    listBookings();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="static-header">
        <h1>Ongoing Bookings Details</h1>
      </div>

      <div className="static-container">
        <div className="static-contain">
          <h2>Current Bookings</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>User Name</TableCell>
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
                {bookings.length === 0 ? (
                  <TableCell align="center" colSpan={7}>
                    No Bookings Currently
                  </TableCell>
                ) : (
                  bookings.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.user.name}</TableCell>
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
                      <TableCell>
                        <button
                          className="blue btn"
                          onClick={() => {
                            navigate(`/chat/${item.user.id}/user`);
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

export default OngoingBookings;
