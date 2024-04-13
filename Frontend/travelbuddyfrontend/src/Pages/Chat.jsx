import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Navbar from "../Components/Navbar";
import { NavLink } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  const handleReceive = () => {
    setMessages([
      ...messages,
      { text: "Hello from the other side!", sender: "other" },
    ]);
  };

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <div className="admin-left">
          <div className="sidebar" style={{ marginTop: "4rem" }}>
            <div className="sidebar-bottom">
              <div className="sidebar-bottom-menu">
                <ul>
                  <li>
                    <NavLink to="/admin-dashboard">
                      <i className="fa-solid fa-home" /> Dashboard
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-right">
          <Grid container sx={{ height: "auto" }}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                marginTop: "4rem",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "background.default",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Typography variant="h5">Chat</Typography>
              </Box>

              <Box sx={{ flexGrow: 1, overflow: "auto", p: 2, height: "60vh" }}>
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection:
                        message.sender === "user" ? "row-reverse" : "row",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor:
                          message.sender === "user"
                            ? deepPurple[500]
                            : deepOrange[500],
                        marginLeft: message.sender === "user" ? 2 : 0,
                        marginRight: message.sender === "user" ? 0 : 2,
                      }}
                    >
                      {message.sender === "user" ? "U" : "O"}
                    </Avatar>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 1,
                        marginLeft: message.sender === "user" ? 2 : 0,
                        marginRight: message.sender === "user" ? 0 : 2,
                        backgroundColor:
                          message.sender === "user"
                            ? "primary.light"
                            : "secondary.light",
                        borderRadius:
                          message.sender === "user"
                            ? "20px 20px 20px 5px"
                            : "20px 20px 5px 20px",
                      }}
                    >
                      <Typography variant="body1">{message.text}</Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "background.default",
                  position: "fixed",
                  bottom: 0,
                  width: "100%",
                }}
              >
                <Grid container spacing={1} style={{ alignItems: "center" }}>
                  <Grid item xs={7}>
                    <TextField
                      fullWidth
                      placeholder="Type a message"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <Button
                      fullWidth
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={handleSend}
                    >
                      Send
                    </Button>
                  </Grid>
                  {/* <Grid item xs={5}>
                    <Button
                      fullWidth
                      size="large"
                      color="secondary"
                      variant="contained"
                      onClick={handleReceive}
                    >
                      Receive
                    </Button>
                  </Grid> */}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Chat;
