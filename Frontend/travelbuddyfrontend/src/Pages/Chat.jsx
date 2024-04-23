import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { senderId } = useParams();
  const { senderRole } = useParams();

  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Current Logged In User Details
  const fetchData = async () => {
    let api = "http://127.0.1:8000/user/profile";
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();
    console.log(parsedData);

    setUser(parsedData[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("message", input);
    formData.append("receiver_id", senderId);
    formData.append("receiver_role", senderRole);

    let api = "http://127.0.0.1:8000/chat/chat";

    let data = fetch(api, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
  };

  const handleReceive = async () => {
    let api = "http://127.0.0.1:8000/chat/chatview";

    let formData = new FormData();
    formData.append("receiver_id", senderId);
    formData.append("receiver_role", senderRole);

    let data = await fetch(api, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    let parsedData = await data.json();
    console.log(parsedData);
    setMessages(parsedData);
  };

  useEffect(() => {
    handleReceive();
  }, []);

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <div className="admin-right">
          <Grid container sx={{ height: "auto" }}>
            <Grid
              item
              xs={10}
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
                <Typography variant="h5">Person 1</Typography>
              </Box>

              {/* <Box sx={{ flexGrow: 1, overflow: "auto", p: 2, height: "60vh" }}>
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
              </Box> */}
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
                  <Grid item xs={9}>
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
