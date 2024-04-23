import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loader from "../Components/Loader";

const Reset = () => {
  document.title = "TravelBuddy ● Reset Password";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (e) => {
    setLoading(true);
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);

    let response = await fetch("http://127.0.1:8000/user/code/resend", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.status === 200) {
      setLoading(false);
      swal("Success", "Code Sent", "success");
      navigate(`/resetpassword/${email}`);
    } else {
      setLoading(false);
      swal("Error", "Failed to send code", "error");
    }
  };

  return (
    <div style={{ marginTop: "-100px" }}>
      <div className="static-header">
        <h1>Enter your Email</h1>
      </div>

      <div className="static-container">
        <div className="verify-container">
          <p>Enter your email to receive a code to reset your password.</p>

          <br />

          <div className="otp-form">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={send} className="btn-primary">
              Send Code
            </button>
          </div>
          {loading ? <Loader /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Reset;
