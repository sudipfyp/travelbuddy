//guide will apply in the requiremnt posted by tourist
 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import swal from "sweetalert";
import No from "../Assets/images/no.jpg";

const GuideApply = () => {
  const navigate = useNavigate();

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
    document.title = "TravelBuddy ● GuideApply";
  }, []);

  const [requirement, setRequirement] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("http://127.0.1:8000/guide/req/list", {
        method: "GET",
        credentials: "include",
      });

      let data = await response.json();

      if (response.status === 200) {
        setRequirement(data.filter((req) => req.status === "active"));
      }
    };
    console.log(requirement);

    fetchData();
  }, []);

  const [money, setMoney] = useState("");

  const handleApply = async (id) => {
    let form = new FormData();
    form.append("price", money);

    let response = await fetch(`http://127.0.1:8000/guide/req/apply/${id}`, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    if (response.status === 200) {
      swal("Success", "Applied Successfully", "success");
      document.getElementById("price").value = "";
    } else if (response.status === 403) {
      swal(
        "Already Applied",
        "You have already applied for this.",
        "error"
      );
      // navigate("/login");
    } else {
      swal("Error", "Failed to apply", "error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="static-header">
        <h1>Apply</h1>
      </div>

      <div className="guide-apply-container">
        <div className="guide-apply-contain">
          {requirement.length === 0 ? (
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
            requirement.map((req) => (
              <div className="guide-apply" key={req.id}>
                <div className="left">
                  <div className="title">
                    <p>Posted by: {req.user.name}</p>
                    <br />
                    <b>{req.title}</b>
                  </div>

                  <div className="description">{req.description}</div>
                </div>

                <div className="right">
                  <p>
                    <i className="fa fa-map-marker"></i> {req.location}
                  </p>

                  <p>
                    <i className="fas fa-dollar"></i> Rs. {req.budget}
                  </p>

                  <p>
                    <i className="fa fa-calendar"></i> {req.date}
                  </p>

                  <input
                    type="number"
                    placeholder="Your price"
                    name=""
                    id="price"
                    onChange={(e) => setMoney(e.target.value)}
                  />

                  <div className="button">
                    <button
                      onClick={() => {
                        handleApply(req.id);
                      }}
                    >
                      Apply
                    </button>
                    <button style={{backgroundColor: "#1976d2", marginLeft: "4rem"}} onClick={() =>  navigate(`/chat/${req.user.id}/user`)}>
                        Chat
                      </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GuideApply;
