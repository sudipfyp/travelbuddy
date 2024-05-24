import React, { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Chat = () => {
  const { senderId, senderRole } = useParams();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const divRef = useRef(null);

  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (
        parsedData.role !== "user" &&
        parsedData.role !== "guide" &&
        parsedData.role !== "seller"
      ) {
        swal(
          "Unauthorized Access",
          "You are not authorized to access this page",
          "error"
        );

        navigate("/login");
      }
    }

    if (data.status === 403) {
      swal(
        "Unauthorized Access",
        "You are not authorized to access this page",
        "error"
      );

      navigate("/login");
    }
  };

  useEffect(() => {
    userCheck();
    document.title = "Travel Buddy ● Chat";
  }, []);

  // Fetch current logged in user details
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.1:8000/user/profile", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUser(data[0]);
    };
    fetchData();
  }, []);

  // Fetch chat messages
  const fetchMessages = async () => {
    const formData = new FormData();
    formData.append("receiver_id", senderId);
    formData.append("receiver_role", senderRole);

    const response = await fetch("http://127.0.0.1:8000/chat/chatview", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    setMessages(data);
    console.log(data);
  };

  //polling
  setTimeout(() => {
    fetchMessages();
  }, 3000);

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", input);
    formData.append("receiver_id", senderId);
    formData.append("receiver_role", senderRole);

    await fetch("http://127.0.0.1:8000/chat/chat", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    setInput("");
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Navbar />

      <div className="message-container">
        <div className="msg-container" ref={divRef}>
          {messages.map((message, index) => {
            return (
              <div key={index}>
                {(senderRole == "guide" &&
                  message.sender_guide !== null &&
                  message.sender_guide.id == senderId) ||
                (senderRole == "user" &&
                  message.sender_user !== null &&
                  message.sender_user.id == senderId) ||
                (senderRole == "seller" &&
                  message.sender_seller !== null &&
                  message.sender_seller.id == senderId) ? (
                  <div className="sender">{message.message}</div>
                ) : (
                  <div className="receiver">{message.message}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="send-container">
        <div className="send-msg">
          <TextField
            fullWidth
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="send-btn">
          <Button
            fullWidth
            size="large"
            color="primary"
            variant="contained"
            onClick={handleSend}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default Chat;
