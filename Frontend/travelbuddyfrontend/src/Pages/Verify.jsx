import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const Verify = () => {
  document.title = "TravelBuddy ● Verify Email";

  const navigate = useNavigate();
  const { email } = useParams();

  const [otp, setOtp] = useState("");

  const verify = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    formData.append("code", otp);

    let response = await fetch("http://127.0.1:8000/user/code/verify", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    let data = await response.json();

    if (response.status === 200) {
      swal("Success", "Account Verified", "success");
      navigate("/login");
    } else {
      swal("Error", "Failed to Verify", "error");
    }
  };

  const resend = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);

    let response = await fetch("http://127.0.1:8000/user/code/resend", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    let data = await response.json();

    if (response.status === 200) {
      swal("Success", "Code Resent", "success");
    } else {
      swal("Error", "Failed to Resend", "error");
    }
  };

  return (
    <div style={{ marginTop: "-100px" }}>
      <div className="static-header">
        <h1>Verify your Email</h1>
      </div>

      <div className="static-container">
        <div className="verify-container">
          <p>
            A verification Code has been sent to your email. Please check your
            email and enter OTP to continue.
          </p>

          <br />

          <div className="otp-form">
            <input
              type="text"
              name="otp"
              id="otp"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <h5 onClick={resend}>Resend</h5>
            <button onClick={verify} className="btn-primary">
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
