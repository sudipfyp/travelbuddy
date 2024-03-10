import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    if (data.status === 200) {
      // navigate(`/${parsedData.role}homepage`);
      navigate("/add");
    }

    if (data.status === 403) {
      navigate("/login");
    }
  };

  useEffect(() => {
    document.title = "TravelBuddy ● Login";

    userCheck();
  }, []);

  const [hotelName, setHotelName] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [hotelLatitude, setHotelLatitude] = useState("");
  const [hotelLongitude, setHotelLongitude] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotelImage, setHotelImage] = useState("");
  const [hotelRating, setHotelRating] = useState("");
  const [hotelNoOfRoom, setHotelNoOfRoom] = useState("");

  const [placeName, setPlaceName] = useState("");
  const [placeLocation, setPlaceLocation] = useState("");
  const [placeLatitude, setPlaceLatitude] = useState("");
  const [placeLongitude, setPlaceLongitude] = useState("");
  const [placeTag, setPlaceTag] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [placeImage, setPlaceImage] = useState("");

  const addHotel = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", hotelName);
    formData.append("description", hotelDescription);
    formData.append("latitude", hotelLatitude);
    formData.append("longitude", hotelLongitude);
    formData.append("address", hotelAddress);
    formData.append("image", hotelImage);
    formData.append("rating", hotelRating);
    formData.append("noOfRoom", hotelNoOfRoom);

    let response = await fetch("http://127.0.1:8000/hotel/add/", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    let parsedData = await response.json();
    console.log(parsedData);
  };

  const addPlace = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", placeName);
    formData.append("location", placeLocation);
    formData.append("latitude", placeLatitude);
    formData.append("longitude", placeLongitude);
    formData.append("tag", placeTag);
    formData.append("description", placeDescription);
    formData.append("image", placeImage);

    let response = await fetch("http://127.0.1:8000/place/add/", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    let parsedData = await response.json();
    console.log(parsedData);
  };

  return (
    <>
      <div className="add-place-container">
        <form className="add-place-form" onSubmit={addPlace}>
          <h2>Add Place</h2>
          <br />
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setPlaceName(e.target.value)}
          />
          <br />

          <label htmlFor="location">Location:</label>
          <br />
          <input
            type="text"
            id="location"
            name="location"
            onChange={(e) => setPlaceLocation(e.target.value)}
          />
          <br />

          <label htmlFor="latitude">Latitude:</label>
          <br />
          <input
            type="text"
            id="latitude"
            name="latitude"
            onChange={(e) => setPlaceLatitude(e.target.value)}
          />
          <br />

          <label htmlFor="longitude">Longitude:</label>
          <br />
          <input
            type="text"
            id="longitude"
            name="longitude"
            onChange={(e) => setPlaceLongitude(e.target.value)}
          />
          <br />

          <label htmlFor="tag">Tag:</label>
          <br />
          <input
            type="text"
            id="tag"
            name="tag"
            onChange={(e) => setPlaceTag(e.target.value)}
          />
          <br />

          <label htmlFor="description">Description:</label>
          <br />
          <input
            type="text"
            id="description"
            name="description"
            onChange={(e) => setPlaceDescription(e.target.value)}
          />
          <br />

          <label htmlFor="image">Image:</label>
          <br />
          <input
            type="file"
            onChange={(e) => setPlaceImage(e.target.files[0])}
          />
          <br />

          <input type="submit" value="Add place" />
        </form>
      </div>

      <div className="add-place-container">
        <form className="add-place-form" onSubmit={addHotel}>
          <h2>Add Hotel</h2>

          <label htmlFor="hotelName">Name:</label>
          <br />
          <input
            type="text"
            id="hotelName"
            name="hotelName"
            onChange={(e) => setHotelName(e.target.value)}
          />
          <br />

          <label htmlFor="hotelDescription">Description:</label>
          <br />
          <input
            type="text"
            id="hotelDescription"
            name="hotelDescription"
            onChange={(e) => setHotelDescription(e.target.value)}
          />
          <br />

          <label htmlFor="hotelLatitude">Latitude:</label>
          <br />
          <input
            type="text"
            id="hotelLatitude"
            name="hotelLatitude"
            onChange={(e) => setHotelLatitude(e.target.value)}
          />
          <br />

          <label htmlFor="hotelLongitude">Longitude:</label>
          <br />
          <input
            type="text"
            id="hotelLongitude"
            name="hotelLongitude"
            onChange={(e) => setHotelLongitude(e.target.value)}
          />
          <br />

          <label htmlFor="hotelAddress">Address:</label>
          <br />
          <input
            type="text"
            id="hotelAddress"
            name="hotelAddress"
            onChange={(e) => setHotelAddress(e.target.value)}
          />
          <br />

          <label htmlFor="hotelImage">Image:</label>
          <br />
          <input
            type="file"
            onChange={(e) => setHotelImage(e.target.files[0])}
          />
          <br />

          <label htmlFor="hotelRating">Rating:</label>
          <br />
          <input
            type="text"
            id="hotelRating"
            name="hotelRating"
            onChange={(e) => setHotelRating(e.target.value)}
          />
          <br />

          <label htmlFor="hotelNoOfRoom">No of room:</label>
          <br />
          <input
            type="text"
            id="hotelNoOfRoom"
            name="hotelNoOfRoom"
            onChange={(e) => setHotelNoOfRoom(e.target.value)}
          />
          <br />

          <input type="submit" value="Add hotel" />
        </form>
      </div>
    </>
  );
};

export default Add;

// Basic CSS styles
const styles = `
  .add-place-container {
    width: 40%;
    padding: 20px;
    margin: 10px auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  .add-place-form {
    display: flex;
    flex-direction: column;
  }

  .add-place-form label {
    margin-bottom: 5px;
  }

  .add-place-form input[type="text"],
  .add-place-form input[type="file"],
  .add-place-form input[type="submit"] {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .add-place-form input[type="submit"] {
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }

  .add-place-form input[type="submit"]:hover {
    background-color: #0056b3;
  }
`;

// Inserting styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
