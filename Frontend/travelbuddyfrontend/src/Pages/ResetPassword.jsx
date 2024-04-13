import React, { useState } from "react";

const Reset = () => {
  document.title = "TravelBuddy ● Change Password";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div style={{ marginTop: "-100px" }}>
      <div className="static-header">
        <h1>Reset your Password</h1>
      </div>

      <div className="static-container">
        <div className="verify-container">
          <p>Add new password!</p>

          <br />

          <div className="otp">
            <form action="">
              <input
                type="password"
                name="otp"
                id="otp"
                placeholder="Enter new Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                name="otp"
                id="otp"
                placeholder="Confirm new Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {password !== confirmPassword && confirmPassword.length > 0 ? (
                <p style={{ color: "red", marginBottom: "1rem" }}>Password does not match</p>
              ) : (
                ""
              )}
              {password !== confirmPassword && password.length > 0 ? (
                <input type="submit" value="Update" disabled style={{cursor:"not-allowed"}}/>
              ) : (
                <input type="submit" value="Update" />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
