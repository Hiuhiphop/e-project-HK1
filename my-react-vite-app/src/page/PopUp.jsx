import React, { useState } from "react";
import "../../public/assets/style/popup.css";
import "animate.css";
import { useNavigate } from "react-router-dom";

export default function PopUp() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="login-form">
        <form className="form-container align-items-start container animate__animated animate__fadeIn">
          <h2 className="login-title">Welcome to FurEver Care</h2>
          <div className="login-content">
            <input
              placeholder="Enter your name"
              type="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <p className="my-2">Select the user category you belong to: </p>
          <div className="role">
            <input type="checkbox" name="petOwner" />
            <label htmlFor="petOwner">Pet Owner</label>
          </div>
          <div className="role">
            <input type="checkbox" name="veterinarian" />
            <label htmlFor="veterinarian">Veterinarian</label>
          </div>
          <div className="role">
            <input type="checkbox" name="volunteer" />
            <label htmlFor="volunteer">Volunteer</label>
          </div>
          <div className="sub-btn d-flex justify-content-center align-items-center">
            <button className="button2" type="submit">
              Start
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
