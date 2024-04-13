import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import swal from "sweetalert";

const GuideHire = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);

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
    document.title = "TravelBuddy ● Hire Guide";
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/user/guide/detail/${id}`)
      .then((response) => response.json())
      .then((data) => setGuide(data[0]));
    console.log(guide);
  }, []);

  const [noOfDays, setNoOfDays] = useState("");
  const [placesInterested, setPlacesInterested] = useState("");
  const [date, setDate] = useState("");

  const handleGuideHire = async (e) => {
    e.preventDefault();

    let form = new FormData();
    form.append("day", noOfDays);
    form.append("place", placesInterested);
    form.append("date", date);

    let response = await fetch(`http://127.0.1:8000/guide/hire/${id}/`, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      swal("Success", "Request sent Successfully", "success");
      navigate(`/guidedetails/${guide.id}`);
    } else {
      swal("Error", "Request Failed", "error");
    }
  };

  if (!guide) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="static-header">
        <h1>Hire {guide.name}</h1>
      </div>

      <div className="guide-hire-container">
        <div className="ghc-left">
          <img src={guide.image} alt="" />
          <br />
          <h3>Name: {guide.name}</h3>
          <br />
          <p>{guide.description}</p>
        </div>

        <div className="ghc-right">
          <div className="ghc-right-top">
            <h3>Hire Guide</h3>
            <br />
            <form onSubmit={handleGuideHire}>
              <label htmlFor="">I want to hire {guide.name} for: </label>
              <input
                type="number"
                placeholder="Number of days"
                id="days"
                onChange={(e) => setNoOfDays(e.target.value)}
              />
              <br />
              <label htmlFor="">I want to visit: </label>
              <input
                type="text"
                placeholder="Places interested"
                onChange={(e) => setPlacesInterested(e.target.value)}
              />
              <br />
              <label htmlFor="">Are you available in?</label>
              <input type="date" onChange={(e) => setDate(e.target.value)} />
              <br />
              <p>I am ready to pay Rs.{guide.charge} per Day.</p>

              {noOfDays !== "" ? (
                <p>
                  Total Amount: Rs.{parseInt(noOfDays) * parseInt(guide.charge)}
                </p>
              ) : null}
              <button type="submit">Send Request</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GuideHire;
