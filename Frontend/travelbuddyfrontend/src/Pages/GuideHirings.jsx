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
import { TextField } from "@mui/material";

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
  }, [refresh]);

  // Rating

  const [value, setValue] = useState(0);
  const [valueReq, setValueReq] = useState(0);
  const [selectGuideHirings, setSelectGuideHirings] = useState([]);
  const [selectGuideReq, setSelectGuideReq] = useState([]);

  const [open, setOpen] = useState(false);
  const [openReq, setOpenReq] = useState(false);
  const handleOpen = (item) => {
    setSelectGuideHirings(item);
    setOpen(true);
  };
  const handleReqOpen = (item) => {
    setSelectGuideReq(item);
    setOpenReq(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenReq(false);
  };

  const handleRate = async (id) => {
    let formData = new FormData();
    formData.append("rating", value);

    let response = await fetch(`http://127.0.0.1:8000/rate/hire/${id}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      swal("Guide Rated", "Guide has been rated successfully", "success");
      setValue(0);
    } else if (response.status === 400) {
      swal("Already Rated", "", "info");
    } else {
      swal("Guide Rating Failed", "Guide rating failed", "error");
    }
    setValue(0);
    setOpen(false);
  };

  const handleRateReq = async (id) => {
    let formData = new FormData();
    formData.append("rating", valueReq);

    let response = await fetch(`http://127.0.0.1:8000/rate/req/${id}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      swal("Guide Rated", "Guide has been rated successfully", "success");
      setValueReq(0);
    } else if (response.status === 400) {
      swal("Already Rated", "", "info");
    } else {
      swal("Guide Rating Failed", "Guide rating failed", "error");
    }
    setValueReq(0);
    setOpenReq(false);
  };

  // Payment
  const [openPayment, setOpenPayment] = useState(false);
  const [jobId, setJobId] = useState([]);

  const handlePaymentOpen = (item) => {
    setJobId(item);
    setOpenPayment(true);
  };
  const handlePaymentClose = () => setOpenPayment(false);

  const [amount, setAmount] = useState("");

  const makePayment = async (id, status) => {
    if (status === "hired") {
      var type = "hiring";
    } else {
      type = "requirement";
    }
    let formData = new FormData();
    formData.append("amount", amount);
    formData.append("jobtype", type);
    formData.append("jobid", id);

    let response = await fetch("http://127.0.0.1:8000/guide/pay", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    let data = await response.json();

    if (response.status === 200) {
      window.location.href = data.msg;
    } else {
      swal("ERROR", "Payment failed", "error");
    }
  };

  const rejectRequest = async (id) => {
    let response = await fetch(
      `http://127.0.0.1:8000/guide/hire/cancel/${id}/`,
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
                      <TableCell
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <>
                          <button
                            className="blue btn"
                            onClick={() => {
                              navigate(`/chat/${item.guide.id}/guide`);
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
                  guideHirings &&
                  guideHirings.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.guide.name}</TableCell>
                      <TableCell>{item.day}</TableCell>
                      <TableCell>{item.place}</TableCell>
                      <TableCell>Rs. {item.day * item.guide.charge}</TableCell>
                      <TableCell>{item.guide.phone}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <>
                          <button
                            className="blue btn"
                            onClick={() => {
                              navigate(`/chat/${item.guide.id}/guide`);
                            }}
                          >
                            Chat
                          </button>
                          <button
                            className="green btn"
                            onClick={() => handlePaymentOpen(item)}
                            style={{ marginTop: "5px" }}
                          >
                            Pay
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
                            navigate(`/chat/${item.guide.id}/guide`);
                          }}
                        >
                          Chat
                        </button>
                        <button
                          className="green btn"
                          onClick={() => handlePaymentOpen(item)}
                          style={{ marginTop: "5px" }}
                        >
                          Pay
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Fragment>
            <Dialog
              open={openPayment}
              onClose={handlePaymentClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Make Payment!"}
              </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="amount"
                  label="Amount"
                  type="number"
                  fullWidth
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </DialogContent>

              <DialogActions>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handlePaymentClose}
                  autoFocus
                >
                  Cancel
                </Button>
                <Button
                  autoFocus
                  variant="contained"
                  color="success"
                  onClick={() => {
                    makePayment(jobId.id, jobId.status);
                  }}
                >
                  Pay
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>

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
                          <button
                            className="blue btn"
                            onClick={() => handleOpen(item)}
                          >
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
                        <button
                          className="blue btn"
                          onClick={() => handleReqOpen(item)}
                        >
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
            {"How do you like the service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText align="center">
              <Rating
                size="large"
                name="simple-controlled"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleClose}
              autoFocus
              variant="contained"
              color="error"
            >
              Cancel
            </Button>

            <Button
              autoFocus
              variant="contained"
              color="success"
              onClick={() => {
                handleRate(selectGuideHirings.id);
              }}
            >
              Rate
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>

      <Fragment>
        <Dialog
          open={openReq}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"How do you like the service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Rating
                size="large"
                name="simple-controlled"
                value={valueReq}
                onChange={(e) => setValueReq(e.target.value)}
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleClose}
              autoFocus
              variant="contained"
              color="error"
            >
              Cancel
            </Button>

            <Button
              autoFocus
              variant="contained"
              color="success"
              onClick={() => {
                handleRateReq(selectGuideReq.id);
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
