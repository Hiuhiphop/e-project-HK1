import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const headerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        headerRef.current.classList.add("sticky");
      } else {
        headerRef.current.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={headerRef} id="header-home" className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-primary">
          <div className="logo">
            <a className="navbar-brand" onClick={() => {
              navigate("/")
            }}>
              <i className="fa-solid fa-scale-balanced"></i>
              <span> OnLaw</span>
            </a>
          </div>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="toggler-icon top-bar"></span>
            <span className="toggler-icon middle-bar"></span>
            <span className="toggler-icon bottom-bar"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center justify-content-end w100">
              <li className="nav-item">
                <a
                  className="nav-link text-color1"
                  aria-current="page"
                  href="index.html"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="service-html">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">
                  Contact
                </a>
              </li>
              <button className="button2" onClick={() => {
                navigate("/login")
              }} >Booking Lawyer</button>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
