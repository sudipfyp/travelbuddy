import React, { useEffect, useState } from "react";
import Map from "../Components/Map";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const CompleteSellerRegistration = () => {
  const navigate = useNavigate();

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

      console.log(parsedData);

      if (parsedData.type !== null) {
        navigate("/sellerhomepage");
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
    document.title = "TravelBuddy ● Complete Seller Register";
  }, []);

  const [type, setType] = useState("Shop");

  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shopLatitude, setShopLatitude] = useState("");
  const [shopLongitude, setShopLongitude] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopLogo, setShopLogo] = useState("");

  const addSellerType = async () => {
    const formData = new FormData();
    formData.append("sellertype", type);

    let response = await fetch("http://127.0.0.1:8000/user/complete/seller", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Success", "Seller type added successfully", "success");
      console.log("Seller type added successfully");
    } else {
      swal("Error", "Something went wrong", "error");
    }
  };

  const addShop = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", shopName);
    formData.append("description", shopDescription);
    formData.append("latitude", position[0]);
    formData.append("longitude", position[1]);
    formData.append("address", location);
    formData.append("image", shopLogo);

    let response = await fetch("http://127.0.0.1:8000/shop/add", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    addSellerType();

    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Success", "Shop added Successfully", "success");

      navigate("/sellerhomepage");
    } else {
      swal("Error", "Failed to add Shop", "error");
    }
  };

  const [hotelName, setHotelName] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [hotelLatitude, setHotelLatitude] = useState("");
  const [hotelLongitude, setHotelLongitude] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotelNoOfRoom, setHotelNoOfRoom] = useState("");
  const [image, setImage] = useState("");

  const addHotel = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", hotelName);
    formData.append("description", hotelDescription);
    formData.append("latitude", position[0]);
    formData.append("longitude", position[1]);
    formData.append("address", district);
    formData.append("location", location);
    formData.append("noOfRoom", hotelNoOfRoom);
    formData.append("image", image);

    let response = await fetch("http://127.0.0.1:8000/hotel/add", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    addSellerType();

    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Success", "Hotel added Successfully", "success");

      navigate("/login");
    } else {
      swal("Error", "Failed to add Hotel", "error");
    }
  };

  const [openmap, setOpenmap] = useState(false);

  const [location, setLocation] = useState(""); // State to hold location
  const [position, setPosition] = useState(""); // State to hold position
  const [district, setDistrict] = useState(""); // State to hold district

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
  };

  const handleDistrictChange = (newDistrict) => {
    setDistrict(newDistrict);
  };

  const handleMapOpen = () => {
    setOpenmap(true);
  };

  const handleMapClose = () => {
    setOpenmap(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ marginTop: "-100px" }}>
      <div className="static-header">
        <h1>Complete Seller Registration</h1>
      </div>

      <div className="static-container">
        <div className="verify-container">
          <p>
            Please fill out the remaining details to complete your registration
          </p>

          <br />

          <div className="otp">
            <p>Business Type</p>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              required
            >
              <option disabled>Select your Business type</option>
              <option value="Shop">Shop</option>
              <option value="Hotel">Hotel</option>
            </select>

            {type === "Hotel" ? (
              <>
                <form onSubmit={addHotel}>
                  <p>Hotel Name</p>
                  <input
                    type="text"
                    name="hotelName"
                    id="hotelName"
                    required
                    value={hotelName}
                    onChange={(e) => {
                      setHotelName(e.target.value);
                    }}
                  />

                  <p>Hotel Description</p>
                  <textarea
                    name="hotelDescription"
                    id="hotelDescription"
                    rows={5}
                    required
                    value={hotelDescription}
                    onChange={(e) => {
                      setHotelDescription(e.target.value);
                    }}
                  />

                  <p>Hotel Location</p>
                  <input
                    type="text"
                    name="hotelLocation"
                    id="hotelLocation"
                    required
                    value={location}
                    onChange={(e) => {
                      handleLocationChange(e.target.value);
                    }}
                  />

                  <Button
                    onClick={() => {
                      handleMapOpen();
                    }}
                  >
                    Locate on map
                  </Button>

                  <Modal
                    open={openmap}
                    onClose={handleMapClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Map
                        onLocationChange={handleLocationChange}
                        onPositionChange={handlePositionChange}
                        onDistrictChange={handleDistrictChange}
                      />
                    </Box>
                  </Modal>

                  <p>District</p>
                  <input
                    type="text"
                    name="hotelAddress"
                    id="hotelAddress"
                    required
                    value={district}
                    onChange={(e) => {
                      setHotelAddress(e.target.value);
                    }}
                    disabled
                  />

                  <p>Hotel Latitude</p>
                  <input
                    type="text"
                    name="hotelLatitude"
                    id="hotelLatitude"
                    required
                    value={position[0]}
                    onChange={(e) => {
                      setHotelLatitude(e.target.value);
                    }}
                    disabled
                  />

                  <p>Hotel Longitude</p>
                  <input
                    type="text"
                    name="hotelLongitude"
                    id="hotelLongitude"
                    required
                    value={position[1]}
                    onChange={(e) => {
                      setHotelLongitude(e.target.value);
                    }}
                    disabled
                  />

                  <p>Number of Rooms</p>
                  <input
                    type="text"
                    name="hotelNoOfRoom"
                    id="hotelNoOfRoom"
                    required
                    value={hotelNoOfRoom}
                    onChange={(e) => {
                      setHotelNoOfRoom(e.target.value);
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
              </>
            ) : (
              <>
                <form onSubmit={addShop}>
                  <p>Shop Name</p>
                  <input
                    type="text"
                    name="shopName"
                    id="shopName"
                    required
                    value={shopName}
                    onChange={(e) => {
                      setShopName(e.target.value);
                    }}
                  />

                  <p>Shop Description</p>
                  <textarea
                    name="shopDescription"
                    id="shopDescription"
                    rows={5}
                    required
                    value={shopDescription}
                    onChange={(e) => {
                      setShopDescription(e.target.value);
                    }}
                  />

                  <p>Shop Location</p>
                  <input
                    type="text"
                    name="shopLocation"
                    id="shopLocation"
                    required
                    value={location}
                    onChange={(e) => {
                      handleLocationChange(e.target.value);
                    }}
                  />

                  <Button
                    onClick={() => {
                      handleMapOpen();
                    }}
                  >
                    Locate on map
                  </Button>

                  <Modal
                    open={openmap}
                    onClose={handleMapClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Map
                        onLocationChange={handleLocationChange}
                        onPositionChange={handlePositionChange}
                        onDistrictChange={handleDistrictChange}
                      />
                    </Box>
                  </Modal>

                  <p>District</p>
                  <input
                    type="text"
                    name="shopAddress"
                    id="shopAddress"
                    required
                    value={district}
                    onChange={(e) => {
                      setShopAddress(e.target.value);
                    }}
                    disabled
                  />

                  <p>Shop Latitude</p>
                  <input
                    type="text"
                    name="shopLatitude"
                    id="shopLatitude"
                    required
                    value={position[0]}
                    onChange={(e) => {
                      setShopLatitude(e.target.value);
                    }}
                    disabled
                  />

                  <p>Shop Longitude</p>
                  <input
                    type="text"
                    name="shopLongitude"
                    id="shopLongitude"
                    required
                    value={position[1]}
                    onChange={(e) => {
                      setShopLongitude(e.target.value);
                    }}
                    disabled
                  />

                  <p>Upload your Logo</p>
                  <input
                    type="file"
                    name="shopLogo"
                    id="shopLogo"
                    placeholder="Image"
                    required
                    onChange={(e) => {
                      setShopLogo(e.target.files[0]);
                    }}
                  />

                  <input type="submit" value="Submit" className="btn-primary" />
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteSellerRegistration;
