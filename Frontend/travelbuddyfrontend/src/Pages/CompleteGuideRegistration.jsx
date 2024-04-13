import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const CompleteGuideRegistration = () => {
  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role !== "guide") {
        swal("Unauthorized Access", "You are not authorized to access this page", "error");
        navigate("/login");
      }
    }

    if (data.status === 403) {
      swal("Unauthorized Access", "You are not authorized to access this page", "error");
      navigate("/login");
    }
  };

  useEffect(() => {
    userCheck();
    document.title = "TravelBuddy ● Complete Guide Register";
  }, []);

  const fetchData = async () => {
    let api = "http://127.0.1:8000/user/profile";
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200 && parsedData[0].description !== null) {
      navigate("/guidehomepage");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [tag, setTag] = useState("");
  const [charge, setCharge] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tag", tag);
    formData.append("charge", charge);
    formData.append("description", description);
    formData.append("image", image);

    let response = await fetch("http://127.0.0.1:8000/user/complete/guide", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    let result = await response.json();
    console.log(result);

    if (response.status === 200) {
      swal("Success", "Registered Successfully", "success");
      navigate("/guidehomepage");
    } else {
      swal("Registration Failed", "", "error");
    }
  };

  return (
    <div style={{ marginTop: "-100px" }}>
      <div className="static-header">
        <h1>Complete Guide Registration</h1>
      </div>

      <div className="static-container">
        <div className="verify-container">
          <p>Please fill out the remaining details to access your profile</p>

          <br />

          <div className="otp">
            <form onSubmit={handleSubmit}>
              <p>Tag</p>
              <select
                name="tag"
                id="tag"
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
                required
              >
                <option disabled>Select your area of expertise</option>
                <option value="natural">Natural</option>
                <option value="cultural">Cultural</option>
                <option value="histoical">Historical</option>
                <option value="adventure">Adventure</option>
              </select>

              <p>Charge per day</p>
              <input
                type="text"
                name="Charge"
                id="Charge"
                value={charge}
                onChange={(e) => {
                  setCharge(e.target.value);
                }}
                required
              />

              <textarea
                name="Description"
                id="Description"
                placeholder="Description"
                rows={5}
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <p>Upload your Image</p>
              <input
                type="file"
                name="image"
                id="image"
                placeholder="Image"
                required
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <input type="submit" value="Submit" className="btn-primary" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteGuideRegistration;
