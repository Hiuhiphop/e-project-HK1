import React, { useState } from "react";
import "../../public/assets/style/register.css";
import "animate.css";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic here
    alert(`Email: ${email}\nPassword: ${password}`);
  };
  return (
    <>
      <div className="register-form">
        <form
          className="form-container container animate__animated animate__fadeIn"
          onSubmit={handleSubmit}
        >
          <h2 className="register-title">Register</h2>
          <div className="register-content">
            <input
              placeholder="Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="register-content">
            <input
              placeholder="Password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="register-content">
            <input
              placeholder="Full name"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="register-content">
            <input
              placeholder="Address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="register-content">
            <input
              placeholder="Phone number"
              value={phoneNum}
              required
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </div>
          <div className="sub-btn d-flex justify-content-center align-items-center">
            <button
              className="button1 mx-2"
              onClick={() => {
                navigate("/register");
              }}
            >
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
