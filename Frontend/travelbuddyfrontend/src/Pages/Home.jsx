import React, { useState, useEffect } from "react";
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

const Home = () => {
  const [trendingDestinations, setTrendingDestinations] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [trendingGuides, setTrendingGuides] = useState([]);
  const [trendingHotels, setTrendingHotels] = useState([]);
  const [localEvents, setLocalEvents] = useState([]);

  useEffect(() => {
    const getDestinations = async () => {
      let response = await fetch("http://127.0.1:8000/place/list");
      let parsedData = await response.json();

      let destinationData = parsedData
        .filter((item) => item.tag === "recommended")
        .slice(0, 4);
      setTrendingDestinations(destinationData);
      console.log(destinationData);
    };
    getDestinations();

    // const getProducts = async () => {
    //   let response = await fetch("http://127.0.1:8000/product/list");
    //   let parsedData = await response.json();

    //   let productData = parsedData
    //     .filter((item) => item.tag === "recommended")
    //     .slice(0, 4);
    //   setTrendingProducts(productData);
    //   console.log(productData);
    // };
    // getProducts();

    const getGuides = async () => {
      let response = await fetch("http://127.0.1:8000/user/guide/list");
      let parsedData = await response.json();

      let guideData = parsedData;
      // .filter((item) => item.tag === "natural")
      // .slice(0, 4);
      setTrendingGuides(guideData);
      console.log(guideData);
    };
    getGuides();

    const getHotels = async () => {
      let response = await fetch("http://127.0.1:8000/hotel/list");
      let parsedData = await response.json();

      let hotelData = parsedData.filter((item) => item.rating > 3).slice(0, 4);
      setTrendingHotels(hotelData);
      console.log(hotelData);
    };
    getHotels();

    // const getEvents = async () => {
    //   let response = await fetch("http://127.0.1:8000/event/list");
    //   let parsedData = await response.json();

    //   let eventData = parsedData
    //     .filter((item) => item.tag === "recommended")
    //     .slice(0, 4);
    //   setLocalEvents(eventData);
    //   console.log(eventData);
    // };
    // getEvents();
  }, []);

  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="home-header">
          <div className="home-headline">
            <h1>Find your Destination!</h1>
          </div>

          <div className="home-search">
            <input type="text" placeholder="No. of Days" />
            <select name="" id="">
              <option value="" disabled>
                Preferences
              </option>
              <option value="">Natural</option>
              <option value="">Cultural</option>
              <option value="">Historical</option>
              <option value="">Religious</option>
              <option value="">Adventure</option>
              <option value="">Hills</option>
            </select>
            <button>Search</button>
          </div>
        </div>

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
            {trendingDestinations.map((item) => (
              <a href={`/placedetails/${item.id}`}>
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
            ))}
          </div>

          <p className="see-more">
            <a href="/place">See More</a>
          </p>
        </div>

        <div className="home-header-headline">
          <h2>Trending Products</h2>

          <div className="home-header-section">
            {trendingProducts.map((item) => (
              <a href={`/productdetails/${item.id}`}>
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
            ))}
          </div>

          <p className="see-more">
            <a href="/product">See More</a>
          </p>
        </div>

        <div className="home-header-headline">
          <h2>Trending Guides</h2>

          <div className="home-header-section">
            {trendingGuides.map((item) => (
              <a href={`/guidedetails/${item.id}`}>
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
                        {item.phone.slice(0, 100)}...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </a>
            ))}
          </div>

          <p className="see-more">
            <a href="/guide">See More</a>
          </p>
        </div>

        <div className="home-header-headline">
          <h2>Trending Hotels</h2>

          <div className="home-header-section">
            {trendingHotels.map((item) => (
              <a href={`/hoteldetails/${item.id}`}>
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
            ))}
          </div>

          <p className="see-more">
            <a href="/hotel">See More</a>
          </p>
        </div>

        <div className="home-header-headline">
          <h2>Local Events</h2>

          <div className="home-header-section">
            {localEvents.map((item) => (
              <a href={`/localeventsdetails/${item.id}`}>
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
            ))}
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
