import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import swal from "sweetalert";

const FindGuide = () => {
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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");

  const [pending, setPending] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();

    let form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("location", place);
    form.append("date", date);
    form.append("budget", budget);

    let response = await fetch("http://127.0.1:8000/guide/req/add", {
      method: "POST",
      body: form,
      credentials: "include",
    });

    if (response.status === 200) {
      swal("Success", "Posted Successfully", "success");
      setRefresh((prev) => !prev);
      setTitle("");
      setDescription("");
      setPlace("");
      setDate("");
      setBudget("");
    } else {
      swal("Error", "Failed to post", "error");
    }
  };

  useEffect(() => {
    const fetchPending = async () => {
      let response = await fetch("http://127.0.1:8000/guide/req/job/list/user", {
        method: "GET",
        credentials: "include",
      });

      let data = await response.json();

      if (response.status === 200) {
        let newData = data.filter((guide) => guide.status === "active");
        setPending(newData);
      }
    };

    fetchPending();
  }, [refresh]);

  const handleDelete = async (id) => {
    let response = await fetch(`http://127.0.1:8000/guide/req/delete/${id}`, {
      method: "POST",
      credentials: "include",
    });

    if (response.status === 200) {
      swal("Success", "Deleted Successfully", "success");
      let newPending = pending.filter((guide) => guide.id !== id);
      setPending(newPending);
    } else {
      swal("Error", "Failed to Delete", "error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="static-header">
        <h1>Post Guide Requirements</h1>
      </div>

      <div
        className="guide-hire-container"
        style={{ justifyContent: "center" }}
      >
        <div className="ghc-right">
          <div className="ghc-right-top">
            <form onSubmit={handlePost}>
              <label htmlFor="">Title </label>
              <input
                type="text"
                placeholder="Eg: Guide Needed for exploring City"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <br />
              <label htmlFor="">Description </label>
              <textarea
                placeholder="Eg: I am here in Kathmandu for 3 days. I need a humble guide who can help me to explore the city."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <br />
              <label htmlFor="">Place</label>
              <input
                type="text"
                placeholder="Place where you are interested to visit"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
              />
              <br />
              <label htmlFor="">Date</label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <br />
              <label htmlFor="">Budget (Rs): </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />

              <button type="submit">Post</button>
            </form>
          </div>
        </div>
      </div>

      <div className="static-container">
        <h3>Pending Requests</h3>
      </div>

      <div className="guide-container">
        {pending.length === 0
          ? "No Pending Requests"
          : pending.map((guide) => (
              <div className="guide-hire-card" key={guide.id}>
                <h3>{guide.title}</h3>

                <p>{guide.description}</p>

                <div className="btn-group">
                  <button
                    onClick={() => {
                      navigate(`/findguide/${guide.id}`);
                    }}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(guide.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>

      <div className="static-container">
        {/* <div className="static-contain">
          <h2>My Post</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>ID</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Title</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>
                    Description
                  </TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Date</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Budget</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Status</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Guide Needed</TableCell>
                  <TableCell>
                    I am here in Kathmandu for 3 days. I need a humble guide who can help me to explore the city.
                  </TableCell>
                  <TableCell>2021-09-25</TableCell>
                  <TableCell>5000</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>
                    <button className="red btn">Cancel</button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <h2>Received Requests</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>ID</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Title</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Price</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Status</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Guide Needed</TableCell>
                  <TableCell>2000</TableCell>
                  <TableCell>waiting</TableCell>

                  <TableCell>
                    <button className="red btn">Reject</button>
                    <button className="green btn">Accept</button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default FindGuide;
