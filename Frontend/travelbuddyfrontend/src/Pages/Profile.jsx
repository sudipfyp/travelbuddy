import React, { useState, useEffect } from "react";
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
import swal from "sweetalert";

const Profile = () => {
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role === "admin") {
        swal(
          "Unauthorized Access",
          "You are not authorized to access this page",
          "error"
        );
        navigate("/login");
      }
    }
    setUser(parsedData);

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
    document.title = "TravelBuddy ● Profile";
  }, []);

  const [profile, setProfile] = useState("");

  const fetchData = async () => {
    let api = "http://127.0.1:8000/user/profile";
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 401) {
      navigate("/login");
    }
    setProfile(parsedData[0]);
  };

  console.log(profile);

  useEffect(() => {
    fetchData();
  }, []);

  const [completedGuideHirings, setCompletedGuideHirings] = useState([]);

  const listGuideHirings = async () => {
    let response = await fetch("http://127.0.1:8000/guide/hire/list/", {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      const completed = data.filter((req) => req.status === "completed");
      setCompletedGuideHirings(completed);
    }
  };

  useEffect(() => {
    listGuideHirings();
  }, []);

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-header-image">
            <img src={profile.image} alt="profile" />
          </div>
          <h3>Welcome {profile.name}</h3>
        </div>

        <div className="profile-details">
          {user.role === "user" ? (
            <>
              <div className="profile-details-row">
                <p>Name</p>
                <p>{profile.name}</p>
              </div>
              <div className="profile-details-row">
                <p>Email</p>
                <p>{profile.email}</p>
              </div>
              <div className="profile-details-row">
                <p>Preferred Place</p>
                <p>{profile.preferredplace}</p>
              </div>
              <div className="profile-details-row">
                <p>Country</p>
                <p>{profile.nationality}</p>
              </div>
              <div className="profile-details-row">
                <p>Address</p>
                <p>{profile.address}</p>
              </div>
            </>
          ) : user.role === "guide" ? (
            <>
              <div className="profile-details-row">
                <p>Name</p>
                <p>{profile.name}</p>
              </div>
              <div className="profile-details-row">
                <p>Email</p>
                <p>{profile.email}</p>
              </div>
              <div className="profile-details-row">
                <p>Phone</p>
                <p>{profile.phone}</p>
              </div>
              <div className="profile-details-row">
                <p>Description</p>
                <p style={{ width: "60%" }}>{profile.description}</p>
              </div>
              <div className="profile-details-row">
                <p>Rating</p>
                <p>{profile.rating}</p>
              </div>
              <div className="profile-details-row">
                <p>Charge</p>
                <p>{profile.charge}</p>
              </div>
              <div className="profile-details-row">
                <p>Address</p>
                <p>{profile.address}</p>
              </div>
              <div className="profile-details-row">
                <p>Tag</p>
                <p>{profile.tag}</p>
              </div>
            </>
          ) : (
            <>
              <div className="profile-details-row">
                <p>Name</p>
                <p>{profile.name}</p>
              </div>
              <div className="profile-details-row">
                <p>Email</p>
                <p>{profile.email}</p>
              </div>
            </>
          )}
          <div className="profile-details-row">
            <p>Password</p>
            <p>**********</p>
          </div>

          <div className="profile-details-row">
            <button
              onClick={() => {
                navigate("/editprofile");
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="user-history">
        <h4>History</h4>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#02cea4" }}>Client Name</TableCell>
                <TableCell style={{ color: "#02cea4" }}>Days</TableCell>
                <TableCell style={{ color: "#02cea4" }}>Place</TableCell>
                <TableCell style={{ color: "#02cea4" }}>Amount</TableCell>
                <TableCell style={{ color: "#02cea4" }}>Email</TableCell>
                <TableCell style={{ color: "#02cea4" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {completedGuideHirings.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.user.name}</TableCell>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{item.place}</TableCell>
                  <TableCell>Rs. {item.day * item.guide.charge}</TableCell>
                  <TableCell>{item.user.email}</TableCell>
                  <TableCell>{item.status}</TableCell>
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
