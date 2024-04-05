import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const TipsDisplay = (props) => {
  return (
    <div className="divitem tipsss">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TipsDisplay;
