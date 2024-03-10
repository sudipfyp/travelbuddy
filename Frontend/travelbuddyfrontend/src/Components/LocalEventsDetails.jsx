import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LocalEventsDetails = () => {
  // const { id } = useParams();
  // const [product, setProduct] = useState(null);

  //   useEffect(() => {
  //       fetch(`http://127.0.0.1:8000/hotel/detail/${id}`)
  //       .then((response) => response.json())
  //       .then((data) => setProduct(data));
  //   }
  //   , [id]);

  //   if (!product) {
  //       return <div>Loading...</div>;
  //   }

  return (
    <>
      <Navbar />

      <div className="details-container">
        <div className="details-top">
          <div className="details-container-left">
            <div className="images-top">
              <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
            </div>
            {/* <div className="images-bottom">
              <div className="image-bottom">
                <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
              </div>
              <div className="image-bottom">
                <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
              </div>
              <div className="image-bottom">
                <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
              </div>
            </div> */}
          </div>
          <div className="details-container-right">
            <div className="details-title">Event Name</div>
            <div className="details-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum blanditiis itaque hic similique quam, corporis fugit
              dolore, vero, est esse ab dignissimos ad provident dicta porro
              aspernatur odio. Magni, ratione. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Culpa provident expedita ratione
              quas voluptate quaerat adipisci, veritatis repudiandae
            </div>
            <div className="details-tags">
              <p><i className="fas fa-tag"></i></p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
            </div>
            <div className="event-date">
              <p><i className="fas fa-calendar"></i> (if known) </p>
            </div>
            <div className="details-location">
              <p>Location: </p>
              <button>Get Direction</button>
            </div>
          </div>
        </div>
        <div className="details-bottom">
          <div className="details-bottom-title">Upcoming Events</div>
          <div className="details-bottom-suggestions">
            <div className="details-bottom-suggestion">1</div>
            <div className="details-bottom-suggestion">2</div>
            <div className="details-bottom-suggestion">3</div>
            <div className="details-bottom-suggestion">4</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LocalEventsDetails;
