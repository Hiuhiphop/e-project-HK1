import React, { useState } from "react";
import "../../public/assets/style/login.css";
import "animate.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <>
      <div className="login-form">
        <form
          className="form-container container animate__animated animate__fadeIn"
          onSubmit={handleSubmit}
        >
          <h2 className="login-title">Choose your lawyer right now</h2>
          <div className="login-content">
            <input
              placeholder="Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-content">
            <input
              placeholder="Password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="sub-btn d-flex justify-content-center align-items-center">
            <button className="button1 mx-2" onClick={() => {navigate("/register")}}>
              Register
            </button>
            <button className="button2 mx-2" type="submit">
              Login
            </button>
            
          </div>
        </form>
      </div>
    </>
  );
}
