import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import swal from "sweetalert";

const FindGuideDetails = () => {
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
    document.title = "TravelBuddy ● FindGuide";
  }, []);

  const { id } = useParams();
  const [guideReq, setGuideReq] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        `http://127.0.0.1:8000/guide/req/detail/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      let data = await response.json();

      if (response.status === 200) {
        setGuideReq(data[0]);
      }
    };

    fetchData();
  }, []);

  const [applied, setApplied] = useState("");

  const fetchData = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/guide/req/job/list/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    let data = await response.json();

    if (response.status === 200) {
      setApplied(data);
    }
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const accept = async (id) => {
    let response = await fetch(
      `http://127.0.0.1:8000/guide/req/job/accept/${id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    let data = await response.json();

    if (response.status === 200) {
      swal("Success", "Accepted Successfully", "success");
      setRefresh((prev) => !prev);
      console.log(data);
    } else {
      swal("Error", "Failed to accept", "error");
    }
  };

  const reject = async (id) => {
    let response = await fetch(
      `http://127.0.0.1:8000/guide/req/job/reject/${id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    let data = await response.json();

    if (response.status === 200) {
      swal("Success", "Rejected Successfully", "success");
      setRefresh((prev) => !prev);
      console.log(data);
    } else {
      swal("Error", "Fsiled to reject", "error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="static-header">
        <h1>{guideReq.title}</h1>
      </div>

      <div className="guide-apply-container">
        <div className="guide-apply-contain">
          <div className="guide-apply">
            <div className="left">
              <div className="title">
                <b>{guideReq.title}</b>
              </div>

              <div className="description">{guideReq.description}</div>
            </div>

            <div className="right">
              <p>
                <i className="fa fa-map-marker"></i> {guideReq.location}
              </p>

              <p>
                <i className="fa fa-dollar"></i> MONEY
              </p>

              <p>
                <i className="fa fa-calendar"></i> {guideReq.date}
              </p>
            </div>
          </div>
        </div>

        <h2>Received Requests</h2>
        <TableContainer style={{ marginBottom: "1rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#02cea4" }}>ID</TableCell>
                <TableCell style={{ color: "#02cea4" }}>Guide Name</TableCell>
                <TableCell style={{ color: "#02cea4" }}>Price</TableCell>
                <TableCell style={{ color: "#02cea4" }}>Status</TableCell>
                <TableCell style={{ color: "#02cea4" }}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {applied.length === 0
                ? "No request yet"
                : applied.map((guide) => (
                    <TableRow key={guide.id}>
                      <TableCell>{guide.id}</TableCell>
                      <TableCell>{guide.guide.name}</TableCell>
                      <TableCell>{guide.price}</TableCell>
                      <TableCell>{guide.status}</TableCell>
                      <TableCell>
                        {guide.status === "pending" ? (
                          <>
                            <button
                              className="red btn"
                              onClick={() => {
                                reject(guide.id);
                              }}
                            >
                              Reject
                            </button>
                            <button
                              className="green btn"
                              onClick={() => {
                                accept(guide.id);
                              }}
                            >
                              Accept
                            </button>
                          </>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Footer />
    </>
  );
};

export default FindGuideDetails;
