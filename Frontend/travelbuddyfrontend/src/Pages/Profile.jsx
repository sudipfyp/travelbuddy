import React, { useEffect } from "react";
import "../Assets/styles/Styles.css";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Profile = () => {
  document.title = "TravelBuddy ● Profile";

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    let api = "http://127.0.1:8000/user/profile";
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    if (data.status === 401) {
      navigate("/login");
    }
  };

  function createData(sn, date, place, guide, rating, review) {
    return { sn, date, place, guide, rating, review };
  }

  const rows = [
    createData("1", "Feb 26 2024", "Kathmandu", "Sudip", "5", "Good"),
    createData("2", "Feb 26 2024", "Kathmandu", "Sudip", "5", "Good"),
    createData("3", "Feb 26 2024", "Kathmandu", "Sudip", "5", "Good"),
    createData("4", "Feb 26 2024", "Kathmandu", "Sudip", "5", "Good"),
  ];

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-header-image">
            <img
              src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
              alt="profile"
            />
          </div>
          <h3>Welcome User!</h3>
        </div>

        <div className="profile-details">
          <div className="profile-details-row">
            <p>Name</p>
            <p>---</p>
          </div>
          <div className="profile-details-row">
            <p>Gender</p>
            <p>---</p>
          </div>
          <div className="profile-details-row">
            <p>Email</p>
            <p>---</p>
          </div>
          <div className="profile-details-row">
            <p>Phone</p>
            <p>---</p>
          </div>
          <div className="profile-details-row">
            <p>Country</p>
            <p>---</p>
          </div>
          <div className="profile-details-row">
            <p>Address</p>
            <p>---</p>
          </div>
          <div className="profile-details-row">
            <p>Password</p>
            <p>**********</p>
          </div>
          <div className="profile-details-row">
            <button
              onClick={() => {
                window.location.href = "/editprofile";
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="user-history">
        <h4>User History</h4>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.N.</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Place</TableCell>
                <TableCell align="right">Guide</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Review</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.sn}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.place}</TableCell>
                  <TableCell align="right">{row.guide}</TableCell>
                  <TableCell align="right">{row.rating}</TableCell>
                  <TableCell align="right">{row.review}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Profile;
