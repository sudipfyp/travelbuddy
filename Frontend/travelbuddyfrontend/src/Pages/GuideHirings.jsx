import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import swal from "sweetalert";
import Rating from "@mui/material/Rating";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Hirings = () => {
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
    document.title = "Travel Buddy ● Guide Hirings";
  }, []);

  const [guideHirings, setGuideHirings] = useState([]);
  const [pendingGuideHirings, setPendingGuideHirings] = useState([]);
  const [pastGuideHirings, setPastGuideHirings] = useState([]);

  const listGuideHirings = async () => {
    let response = await fetch("http://127.0.1:8000/guide/hire/current/", {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      const current = data.filter((req) => req.status === "hired");
      setGuideHirings(current);

      const pending = data.filter((req) => req.status === "ongoing");
      setPendingGuideHirings(pending);

      const past = data.filter((req) => req.status === "paid");
      setPastGuideHirings(past);
    }
  };

  const [guideReq, setGuideReq] = useState([]);
  const [pastGuideReq, setPastGuideReq] = useState([]);

  const listGuideReq = async () => {
    let response = await fetch(
      `http://127.0.1:8000/guide/req/user/total/current/job`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      let current = data.filter((req) => req.status === "accepted");
      setGuideReq(current);

      let past = data.filter((req) => req.status === "paid");
      setPastGuideReq(past);
    }
  };

  useEffect(() => {
    listGuideHirings();
    listGuideReq();
  }, []);

  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Navbar />

      <div className="static-header">
        <h1>Guide Hiring Details</h1>
      </div>

      <div className="static-container">
        <div className="static-contain">
          <h2>Pending Hirings</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>Date</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Guide Name</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Days</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Place</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Amount</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Contact</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Status</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {pendingGuideHirings.length === 0 ? (
                  <TableRow>
                    <TableCell align="center" colSpan={8}>
                      No Pending Hirings
                    </TableCell>
                  </TableRow>
                ) : (
                  pendingGuideHirings.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.guide.name}</TableCell>
                      <TableCell>{item.day}</TableCell>
                      <TableCell>{item.place}</TableCell>
                      <TableCell>Rs. {item.day * item.guide.charge}</TableCell>
                      <TableCell>{item.guide.phone}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        <>
                          <button className="blue btn">Chat</button>
                          <button className="red btn">Cancel</button>
                        </>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <br />

          <h2>Current Hirings</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>Date</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Guide Name</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Days</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Place</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Amount</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Contact</TableCell>
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
                      <TableCell>{item.guide.name}</TableCell>
                      <TableCell>{item.day}</TableCell>
                      <TableCell>{item.place}</TableCell>
                      <TableCell>Rs. {item.day * item.guide.charge}</TableCell>
                      <TableCell>{item.guide.phone}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        <>
                          <button className="blue btn">Chat</button>
                          <button className="green btn">Pay</button>
                        </>
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
                      <TableCell>{item.guide.name}</TableCell>
                      <TableCell>{item.guidereq.location}</TableCell>
                      <TableCell>{item.guidereq.title}</TableCell>
                      <TableCell>{item.guidereq.description}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        <button className="blue btn">Chat</button>
                        <button className="green btn">Pay</button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <br />

          <h2>Past Hirings</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>Date</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Guide Name</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Days</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Place</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Amount</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Contact</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Status</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {pastGuideHirings.length === 0 ? (
                  <TableRow>
                    <TableCell align="center" colSpan={8}>
                      No Hirings Yet
                    </TableCell>
                  </TableRow>
                ) : (
                  pastGuideHirings.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.guide.name}</TableCell>
                      <TableCell>{item.day}</TableCell>
                      <TableCell>{item.place}</TableCell>
                      <TableCell>Rs. {item.day * item.guide.charge}</TableCell>
                      <TableCell>{item.guide.phone}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        <>
                          <button className="blue btn" onClick={handleOpen}>
                            Rate
                          </button>
                        </>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <br />

          <h2>Past Hirings (Requirement Posting)</h2>
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
                {pastGuideReq.length === 0 ? (
                  <TableRow>
                    <TableCell align="center" colSpan={8}>
                      No Hirings Yet
                    </TableCell>
                  </TableRow>
                ) : (
                  pastGuideReq.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.guidereq.date}</TableCell>
                      <TableCell>{item.guide.name}</TableCell>
                      <TableCell>{item.guidereq.location}</TableCell>
                      <TableCell>{item.guidereq.title}</TableCell>
                      <TableCell>{item.guidereq.description}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        <button className="blue btn" onClick={handleOpen}>
                          Rate
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

      <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Rate your Guide"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Rating
                size="large"
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                //handleDelete(selectedHotel);
                handleClose();
              }}
            >
              Rate
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>

      <Footer />
    </div>
  );
};

export default Hirings;
