import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Loader from "../Components/Loader";

const ResetCode = () => {
  document.title = "TravelBuddy ● Reset Password";

  const navigate = useNavigate();
  const { email } = useParams();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

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
      swal("Success", "Code Verified", "success");
      navigate(`/change/${data.token}`);
    } else {
      swal("Error", "Failed to Verify", "error");
    }
  };

  const resend = async (e) => {
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
      swal("Success", "Code Resent", "success");
    } else {
      setLoading(false);
      swal("Error", "Failed to Resend", "error");
    }
  };

  return (
    <div style={{ marginTop: "-100px" }}>
      <div className="static-header">
        <h1>Enter your OTP</h1>
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
              placeholder="Enter your OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <h5 onClick={resend}>Resend</h5>
            <button onClick={verify} className="btn-primary">
              Verify
            </button>
          </div>
          {loading ? <Loader /> : ""}
        </div>
      </div>
    </div>
  );
};

export default ResetCode;
