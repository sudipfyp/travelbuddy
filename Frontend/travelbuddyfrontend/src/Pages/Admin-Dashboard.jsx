import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  BarController,
} from "chart.js";

Chart.register(LinearScale, CategoryScale, BarElement, BarController);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [guides, setGuides] = useState([]);
  const [sellers, setSellers] = useState([]);

  const countUsers = async () => {
    let data = await fetch("http://127.0.0.1:8000/user/countusers");
    let response = await data.json();
    setUsers(response.count);
  };

  const countGuides = async () => {
    let data = await fetch("http://127.0.0.1:8000/user/countguides");
    let response = await data.json();
    setGuides(response.count);
  };

  const countSellers = async () => {
    let data = await fetch("http://127.0.0.1:8000/user/countsellers");
    let response = await data.json();
    setSellers(response.count);
  };

  useEffect(() => {
    countUsers();
    countGuides();
    countSellers();
  }, []);

  const data = {
    labels: ["Tourists", "Guides", "Sellers"],
    datasets: [
      {
        label: "# of People",
        data: [users, guides, sellers],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="admin-container">
        <div className="admin-left">
          <Sidebar />
        </div>

        <div className="admin-right">
          <Grid container spacing={2}>
            <Grid item xs={3} md={4}>
              <Card sx={{ minWidth: 200 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="text.secondary"
                    gutterBottom
                    align="center"
                  >
                    Tourists
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: 20 }}
                    align="center"
                  >
                    {users}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3} md={4}>
              <Card sx={{ minWidth: 200 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="text.secondary"
                    gutterBottom
                    align="center"
                  >
                    Guide
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: 20 }}
                    align="center"
                  >
                    {guides}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3} md={4}>
              <Card sx={{ minWidth: 200 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="text.secondary"
                    gutterBottom
                    align="center"
                  >
                    Sellers
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: 20 }}
                    align="center"
                  >
                    {sellers}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <br />

          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
