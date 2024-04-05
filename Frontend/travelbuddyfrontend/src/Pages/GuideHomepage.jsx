import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const GuideHomepage = () => {
  const [request, setRequest] = useState([]);

  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if (data.status === 200) {
      console.log(parsedData);
    } else {
      alert("Login First");
      navigate("/login");
    }
  };

  useEffect(() => {
    userCheck();
    document.title = "Guide Homepage";
  }, []);

  const listRequest = async () => {
    let response = await fetch("http://127.0.1:8000/guide/hire/list/", {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      setRequest(data);
    } else {
      alert("Request failed");
    }
  };

  useEffect(() => {
    listRequest();
  }, []);

  const acceptRequest = async (id) => {
    let response = await fetch(
      `http://127.0.1:8000/guide/hire/accept/${id}/`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      alert("Request accepted successfully");
      navigate("/guidehomepage");
    } else {
      alert("Request failed");
    }
  };

  // const rejectRequest = async (id) => {
  //   let response = await fetch(
  //     `http://127.0.1:8000/guide/hire/reject/${id}/`,
  //     {
  //       method: "GET",
  //       credentials: "include",
  //     }
  //   );

  //   let data = await response.json();
  //   console.log(data);

  //   if (response.status === 200) {
  //     alert("Request rejected successfully");
  //     navigate("/guidehomepage");
  //   } else {
  //     alert("Request failed");
  //   }
  // };

  return (
    <div className="guide-homepage">
      <Navbar />

      <div className="static-container">
        <h1 className="guide-homepage-title">Guide Homepage</h1>

        <div className="guide-hire-list">
          {request.map((req) => {
            return (
              <div className="guide-hire-card">
                <h3>{req.user.name}</h3>
                <h3 className="guide-hire-card-title">{req.place}</h3>
                <p className="guide-hire-card-day">{req.day}</p>
                <p>{req.user.name}</p>
                <button
                  className="guide-hire-card-button-hire"
                  onClick={() => acceptRequest(req.id)}
                >
                  Accept
                </button>
                <button
                  className="guide-hire-card-button-cancel"
                >
                  Reject
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GuideHomepage;
