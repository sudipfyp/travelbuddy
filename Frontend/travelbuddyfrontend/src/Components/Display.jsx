import React from "react";
import { Link, useLocation } from "react-router-dom";

const Display = ({ headerheadline, data, component: Component }) => {
  const location = useLocation();

  return (
    <div className="common-header-headline">
      <h2>{headerheadline}</h2>
      <div className="common-header-section">
        {/* Map through the data and render each item using the passed component */}
        {data.map((item, index) => (
          <Component key={index} item={item} />
        ))}
      </div>
      <p className="see-more">
        <Link
          to={`${location.pathname}/${headerheadline
            .toLowerCase()
            .replace(/\s/g, "-")}`}
        >
          See More
        </Link>
      </p>
    </div>
  );
};

export default Display;
