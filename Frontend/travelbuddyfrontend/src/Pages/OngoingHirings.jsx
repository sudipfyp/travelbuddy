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

const OngoingHirings = () => {
  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role !== "guide") {
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

  const [guideHirings, setGuideHirings] = useState([]);

  const listGuideHirings = async () => {
    let response = await fetch("http://127.0.1:8000/guide/hire/list/", {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      const current = data.filter((req) => req.status === "hired");
      setGuideHirings(current);
    }
  };

  const [guideReq, setGuideReq] = useState([]);

  const listGuideReq = async () => {
    let response = await fetch(
      `http://127.0.1:8000/guide/req/guide/total/current/job`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      setGuideReq(data);
    }
  };

  useEffect(() => {
    listGuideHirings();
    listGuideReq();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="static-header">
        <h1>Ongoing Hiring Details</h1>
      </div>

      <div className="static-container">
        <div className="static-contain">
          <h2>Current Hirings</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>Date</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Name</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Days</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Place</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Amount</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Email</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Status</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {guideHirings.length === 0 ? (
                  <TableRow>
                    <TableCell align="center" colSpan={8}>
                      No Hirings
                    </TableCell>
                  </TableRow>
                ) : (
                  guideHirings.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.user.name}</TableCell>
                      <TableCell>{item.day}</TableCell>
                      <TableCell>{item.place}</TableCell>
                      <TableCell>Rs. {item.day * item.guide.charge}</TableCell>
                      <TableCell>{item.user.email}</TableCell>
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

          <br />
          <br />

          <h2>Current Hirings (Requirement Posting)</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>Date</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Guide Name</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Place</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Title</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>
                    Description
                  </TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Amount</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Status</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {guideReq.length === 0 ? (
                  <TableRow>
                    <TableCell align="center" colSpan={8}>
                      No Hirings
                    </TableCell>
                  </TableRow>
                ) : (
                  guideReq.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.guidereq.date}</TableCell>
                      <TableCell>{item.guidereq.user.name}</TableCell>
                      <TableCell>{item.guidereq.location}</TableCell>
                      <TableCell>{item.guidereq.title}</TableCell>
                      <TableCell>{item.guidereq.description}</TableCell>
                      <TableCell>{item.price}</TableCell>
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

export default OngoingHirings;
