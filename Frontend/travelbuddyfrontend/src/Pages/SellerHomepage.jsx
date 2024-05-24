import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Button } from "@mui/material";
import No from "../Assets/images/no.jpg";

import ProductDisplay from "../Components/ProductDisplay";

const SellerHomepage = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const [user, setUser] = useState("");

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role !== "seller") {
        swal(
          "Unauthorized Access",
          "You are not authorized to access this page",
          "error"
        );
        navigate("/login");
      }
      setUser(parsedData);
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
    document.title = "TravelBuddy ● Seller Homepage";
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

  useEffect(() => {
    fetchData();
  }, []);

  const [shop, setShop] = useState("");

  const fetchShop = async () => {
    let api = `http://127.0.1:8000/shop/detail/${profile.id}`;
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();
    console.log(parsedData);

    if (data.status === 200) {
      setShop(parsedData[0]);
    }
  };

  useEffect(() => {
    if (profile.id) {
      fetchShop();
    }
  }, [profile]);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    let api = `http://127.0.1:8000/shop/product/list/${shop.id}`;
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();
    console.log(parsedData);

    if (data.status === 200) {
      setProducts(parsedData);
    }
  };

  useEffect(() => {
    if (shop.id) {
      fetchProducts();
    }
  }, [shop]);

  const [Hotel, setHotel] = useState("");

  const fetchHotel = async () => {
    let api = `http://127.0.1:8000/hotel/detail/${profile.id}`;
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      setHotel(parsedData[0]);
    }
  };

  useEffect(() => {
    if (profile.id) {
      fetchHotel();
    }
  }, [profile]);

  const [request, setRequest] = useState([]);

  const listRequest = async () => {
    let response = await fetch(
      "http://127.0.1:8000/hotel/room/booking/seller",
      {
        method: "GET",
        credentials: "include",
      }
    );

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      const current = data.filter((req) => req.status === "pending");
      setRequest(current);
    }
  };

  useEffect(() => {
    listRequest();
  }, [refresh]);

  const acceptRequest = async (id) => {
    let response = await fetch(`http://127.0.1:8000/hotel/room/accept/${id}`, {
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
    let response = await fetch(`http://127.0.1:8000/hotel/room/reject/${id}`, {
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
      {user.type === "Shop" ? (
        <>
          <div className="static-header">
            <h1>Products</h1>
          </div>

          <div className="tips-container">
            <div className="travel-tips">
              <div className="tips-collection" style={{ marginTop: "1rem" }}>
                {products.length === 0 ? (
                  <>
                    <h1 style={{ margin: "auto" }}>"No Products"</h1>
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
                  products.map((product) => (
                    <ProductDisplay
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      ) : user.type === "Hotel" ? (
        <>
          <div className="static-header">
            <h1>Booking Request</h1>
          </div>

          <div className="static-container">
            <div className="guide-container">
              {request.length === 0 ? (
                <>
                  <h1 style={{ margin: "auto" }}>"No pending bookings"</h1>
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
                      <div className="guide-hire-card" key={req.id}>
                        <img src={req.user.image} alt="" />

                        <h3>Requested by: {req.user.name}</h3>

                        <p>Checkin Date: {req.checkIn}</p>
                        <p>Checkout Date: {req.checkOut}</p>
                        <p>Room Type: {req.room.roomType}</p>
                        <p>Price: {req.room.roomPrice}</p>

                        <div className="btn-group">
                          <button onClick={() => acceptRequest(req.id)}>
                            Accept
                          </button>
                          <button onClick={() => rejectRequest(req.id)}>
                            Reject
                          </button>
                          <button
                            style={{ backgroundColor: "#1976d2" }}
                            onClick={() =>
                              navigate(`/chat/${req.user.id}/user`)
                            }
                          >
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
        </>
      ) : (
        <>
          <div className="static-header">Register your Business First!</div>

          <center>
            <Button
              onClick={() => {
                navigate("/seller/complete");
              }}
            >
              Register Here
            </Button>
          </center>
        </>
      )}

      <Footer />
    </div>
  );
};

export default SellerHomepage;
