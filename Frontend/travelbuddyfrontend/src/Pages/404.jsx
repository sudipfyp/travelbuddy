import React, { useEffect } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Page404 = () => {
  useEffect(() => {
    document.title = "TravelBuddy ● 404";
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1"
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
              <Button
                onClick={() => {
                  window.location.href = "/";
                }}
                variant="contained"
                style={{ marginTop: "1rem" }}
              >
                Back Home
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </div>
  );
};

export default Page404;
