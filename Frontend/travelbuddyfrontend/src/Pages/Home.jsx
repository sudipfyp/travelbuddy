import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import Place from "../Assets/images/destination.png";
import Product from "../Assets/images/products.png";
import Guide from "../Assets/images/guides.png";
import Hotel from "../Assets/images/hotels.png";
import swal from "sweetalert";

const Home = () => {
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
  };

  useEffect(() => {
    document.title = "TravelBuddy - Your Travel Companion";
    userCheck();
  }, []);

  const [trendingDestinations, setTrendingDestinations] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [trendingGuides, setTrendingGuides] = useState([]);
  const [trendingHotels, setTrendingHotels] = useState([]);
  const [localEvents, setLocalEvents] = useState([]);

  useEffect(() => {
    const getDestinations = async () => {
      let response = await fetch("http://127.0.1:8000/place/list");
      let parsedData = await response.json();

      if (parsedData.length > 0) {
        let destinationData = parsedData
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setTrendingDestinations(destinationData);
      }
      console.log(parsedData);
    };
    getDestinations();

    const getProducts = async () => {
      let response = await fetch("http://127.0.1:8000/shop/product/listall");
      let parsedData = await response.json();

      if (parsedData.length > 0) {
        let productData = parsedData
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setTrendingProducts(productData);
      }
      console.log(parsedData);
    };
    getProducts();

    const getGuides = async () => {
      let response = await fetch("http://127.0.1:8000/user/guide/list");
      let parsedData = await response.json();

      if (parsedData.length > 0) {
        let guideData = parsedData.sort(() => 0.5 - Math.random()).slice(0, 4);
        setTrendingGuides(guideData);
      }
      console.log(parsedData);
    };
    getGuides();

    const getHotels = async () => {
      let response = await fetch("http://127.0.1:8000/hotel/list");
      let parsedData = await response.json();

      if (parsedData.length > 0) {
        let hotelData = parsedData.sort(() => 0.5 - Math.random()).slice(0, 4);

        setTrendingHotels(hotelData);
      }
      console.log(parsedData);
    };
    getHotels();

    const getEvents = async () => {
      let response = await fetch("http://127.0.1:8000/event/list");
      let parsedData = await response.json();

      if (parsedData.length > 0) {
        let eventData = parsedData.sort(() => 0.5 - Math.random()).slice(0, 4);
        setLocalEvents(eventData);
      }

      console.log(parsedData);
    };
    getEvents();
  }, []);

  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="home-header-image"></div>

        <div className="home-header-image-section">
          <div className="home-header-section-div">
            <a href="/place">
              <img src={Place} alt="place" />
            </a>
          </div>
          <div className="home-header-section-div">
            <a href="/product">
              <img src={Product} alt="product" />
            </a>
          </div>
          <div className="home-header-section-div">
            <a href="/guide">
              <img src={Guide} alt="guide" />
            </a>
          </div>
          <div className="home-header-section-div">
            <a href="/hotel">
              <img src={Hotel} alt="hotel" />
            </a>
          </div>
        </div>

        <div className="home-header-headline">
          <h2>Trending Destinations</h2>

          <div className="home-header-section">
            {trendingDestinations.length > 0 ? (
              trendingDestinations.map((item) => (
                <a href={`/placedetails/${item.id}`} key={item.id}>
                  <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description.slice(0, 100)}...
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </a>
              ))
            ) : (
              <center>No Destinations Available</center>
            )}
          </div>

          <p className="see-more">
            <a href="/place">See More</a>
          </p>
        </div>

        <div className="home-header-headline">
          <h2>Trending Products</h2>

          <div className="home-header-section">
            {trendingProducts.length > 0 ? (
              trendingProducts.map((item) => (
                <a href={`/productdetails/${item.id}`} key={item.id}>
                  <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description.slice(0, 100)}...
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </a>
              ))
            ) : (
              <center>No Products Available</center>
            )}
          </div>

          <p className="see-more">
            <a href="/product">See More</a>
          </p>
        </div>

        <div className="home-header-headline">
          <h2>Trending Guides</h2>

          <div className="home-header-section">
            {trendingGuides.length > 0 ? (
              trendingGuides.map((item) => (
                <a href={`/guidedetails/${item.id}`} key={item.id}>
                  <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description.slice(0, 100)}...
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </a>
              ))
            ) : (
              <center>No Guides Available</center>
            )}
          </div>

          <p className="see-more">
            <a href="/guide">See More</a>
          </p>
        </div>

        <div className="home-header-headline">
          <h2>Trending Hotels</h2>

          <div className="home-header-section">
            {trendingHotels.length > 0 ? (
              trendingHotels.map((item) => (
                <a href={`/hoteldetails/${item.id}`} key={item.id}>
                  <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description.slice(0, 100)}...
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </a>
              ))
            ) : (
              <center>No Hotels Available</center>
            )}
          </div>

          <p className="see-more">
            <a href="/hotel">See More</a>
          </p>
        </div>

        <div className="home-header-headline">
          <h2>Local Events</h2>

          <div className="home-header-section">
            {localEvents.length > 0 ? (
              localEvents.map((item) => (
                <a href={`/localeventdetails/${item.id}`} key={item.id}>
                  <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description.slice(0, 100)}...
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </a>
              ))
            ) : (
              <center>No Events Available</center>
            )}
          </div>

          <p className="see-more">
            <a href="/localevents">See More</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
