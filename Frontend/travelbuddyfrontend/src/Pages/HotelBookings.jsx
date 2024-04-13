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

  const [guideHirings, setGuideHirings] = useState([]);
  const [completedGuideHirings, setCompletedGuideHirings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [completedHotelBookings, setCompletedHotelBookings] = useState([]);

  const listGuideHirings = async () => {
    let response = await fetch("http://127.0.1:8000/guide/hire/current/", {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      const current = data.filter(
        (req) => req.status === "ongoing" || req.status === "hired"
      );
      setGuideHirings(current);

      const past = data.filter(
        (req) => req.status === "rejected" || req.status === "completed"
      );
      setCompletedGuideHirings(past);
    }
  };

  useEffect(() => {
    listGuideHirings();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="static-header">
        <h1>Hotel Booking Details</h1>
      </div>

      <div className="static-container">
        <div className="static-contain">
          <h2 className="static-heading">Current Bookings</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>Hotel Name</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Address</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>CheckIn Date</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>CheckOut Date</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Amount</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Contact</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Status</TableCell>
                  <TableCell colSpan={2} style={{ color: "#02cea4" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {guideHirings.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.guide.name}</TableCell>
                    <TableCell>{item.place}</TableCell>
                    <TableCell>{item.day}</TableCell>
                    <TableCell>{item.day}</TableCell>
                    <TableCell>Rs. {item.day * item.guide.charge}</TableCell>
                    <TableCell>{item.guide.phone}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell colSpan={2}>
                      {item.status === "ongoing" ? (
                        <>
                          <button>Cancel</button>
                          <button>Chat</button>
                        </>
                      ) : item.status === "hired" ? (
                        <>
                          <button>Pay</button>
                          <button>Chat</button>
                        </>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <br />

          <h2 className="static-heading">Past Bookings</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell style={{ color: "#02cea4" }}>Hotel Name</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Address</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>CheckIn Date</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>CheckOut Date</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Amount</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Contact</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {completedGuideHirings.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.guide.name}</TableCell>
                    <TableCell>{item.day}</TableCell>
                    <TableCell>{item.place}</TableCell>
                    <TableCell>Rs. {item.day * item.guide.charge}</TableCell>
                    <TableCell>{item.guide.phone}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
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
