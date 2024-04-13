import React from "react";
import "../Assets/styles/Styles.css";
import Navbar from "../Components/Navbar";

const EditProfile = () => {
  document.title = "TravelBuddy ● Edit Profile";
  
  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-header">
          <h3>Edit Profile</h3>
        </div>

        <div className="profile-details">
          <div className="profile-details-row">
            <p>Name</p>
            <input type="text" name="name" id="name" value="---" />
          </div>
          <div className="profile-details-row">
            <p>Email</p>
            <input type="text" name="" id="" value="---"/>
          </div>
          <div className="profile-details-row">
            <p>Phone</p>
            <input type="text" name="" id="" value="---"/>
          </div>
          <div className="profile-details-row">
            <p>Country</p>
            <input type="text" name="" id="" value="---"/>
          </div>
          <div className="profile-details-row">
            <p>Address</p>
            <input type="text" name="" id="" value="---"/>
          </div>
          <div className="profile-details-row">
            <p>Password</p>
            <input type="password" name="" id="" value="pass" />
          </div>
          <div className="profile-details-row">
            <button className="cancel">Cancel</button>
            <button>Update</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
