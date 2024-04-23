import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const Change = () => {
  document.title = "TravelBuddy ● Change Password";

  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const change = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("password", password);
    formData.append("token", token);

    let response = await fetch("http://127.0.1:8000/user/password/reset", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.status === 200) {
      swal("Success", "Password Changed", "success");
      navigate("/login");
    } else {
      swal("Error", "Failed to Change", "error");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div style={{ marginTop: "-100px" }}>
      <div className="static-header">
        <h1>Reset your Password</h1>
      </div>

      <div className="static-container">
        <div className="verify-container">
          <p>Add new password!</p>

          <br />

          <div className="otp-form">
            <input
              type="password"
              name="otp"
              id="password"
              placeholder="Enter new Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              name="otp"
              id="confirmpassword"
              placeholder="Confirm new Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {password !== confirmPassword && confirmPassword.length > 0 ? (
              <p style={{ color: "red", marginBottom: "1rem" }}>
                Password does not match
              </p>
            ) : (
              ""
            )}

            {password !== confirmPassword && password.length > 0 ? (
              <button type="submit" disabled style={{ cursor: "not-allowed" }}>
                Change
              </button>
            ) : (
              <button onClick={change} className="btn-primary">
                Change
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Change;
