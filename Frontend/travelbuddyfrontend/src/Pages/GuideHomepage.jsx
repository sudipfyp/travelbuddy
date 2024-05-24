import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import No from "../Assets/images/no.jpg";

const GuideHomepage = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

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
    document.title = "TravelBuddy ● Guide Homepage";
  }, []);

  const [request, setRequest] = useState([]);

  const listRequest = async () => {
    let response = await fetch("http://127.0.1:8000/guide/hire/list/", {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      const current = data.filter((req) => req.status === "ongoing");
      setRequest(current);
    }
  };

  useEffect(() => {
    listRequest();
  }, [refresh]);

  const acceptRequest = async (id) => {
    let response = await fetch(`http://127.0.1:8000/guide/hire/accept/${id}/`, {
      method: "POST",
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      swal("Success", "Request accepted Successfully", "success");
      setRefresh((prev) => !prev);
    } else {
      swal("Error", "Something went wrong", "error");
    }
  };

  const rejectRequest = async (id) => {
    let response = await fetch(`http://127.0.1:8000/guide/hire/reject/${id}/`, {
      method: "POST",
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      swal("Success", "Request rejected Successfully", "success");
      setRefresh((prev) => !prev);
    } else {
      swal("Error", "Something went wrong", "error");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="static-header">
        <h1>Hiring Request</h1>
      </div>

      <div className="static-container">
        <div className="guide-container">
          {request.length === 0 ? (
            <>
              <h1 style={{ margin: "auto" }}>"No pending request"</h1>
              <img
                src={No}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  marginTop: "20px",
                }}
              />
            </>
          ) : (
            <>
              {request.map((req) => {
                return (
                  <div className="guide-hire-card">
                    <img src={req.user.image} alt="" />

                    <h3>Requested by: {req.user.name}</h3>

                    <p>Interested Places: {req.place}</p>
                    <p>No. of Days: {req.day}</p>
                    <p>Amount: Rs. {req.guide.charge * req.day}</p>

                    <div className="btn-group">
                      <button onClick={() => acceptRequest(req.id)}>
                        Accept
                      </button>
                      <button onClick={() => rejectRequest(req.id)}>
                        Reject
                      </button>
                      <button style={{backgroundColor: "#1976d2"}} onClick={() =>  navigate(`/chat/${req.user.id}/user`)}>
                        Chat
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GuideHomepage;
