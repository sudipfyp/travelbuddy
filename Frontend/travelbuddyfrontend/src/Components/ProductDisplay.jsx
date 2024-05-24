//to display own products in seller homepage as well as in shop details page

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProductDisplay = (props) => {
  return (
    <div className="divitem">
      <a href={`/productdetails/${props.id}`}>
        <Card sx={{ maxWidth: 300 }}>
          <CardMedia component="img" height="200" image={props.image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ textAlign: "justify" }}
            >
              {props.description}{" "}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginTop: "5px" }}
            >
              Rs. {props.price}{" "}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </div>
  );
};

export default ProductDisplay;
