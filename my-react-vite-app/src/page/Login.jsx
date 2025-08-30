import React, { useState } from "react";
import "../../public/assets/style/login.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <>
      <div className="login-form">
        <form className="form-container container" onSubmit={handleSubmit}>
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
          <button className="button2" type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
