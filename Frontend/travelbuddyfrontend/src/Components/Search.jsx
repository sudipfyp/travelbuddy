import React from "react";

export default function Search(props) {
  return (
    <div className="common-header">
      <div className="common-headline">
        <h1>{props.headline}</h1>
      </div>

      {/* <div className="common-search">
        <input type="text" placeholder={props.placeholder} />

        <button>Search</button>
      </div> */}
    </div>
  );
}
