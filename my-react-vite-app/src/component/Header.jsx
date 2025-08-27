import React from "react";

export default function header() {
  return (
    <header id="header-home" class="header">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-primary">
          <div class="logo">
            <a class="navbar-brand" href="index.html">
              <i class="fa-solid fa-scale-balanced"></i>
              <span>OnLaw</span>
            </a>
          </div>
          <button
            class="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="toggler-icon top-bar"></span>
            <span class="toggler-icon middle-bar"></span>
            <span class="toggler-icon bottom-bar"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center justify-content-end w100">
              <li class="nav-item">
                <a
                  class="nav-link text-color1"
                  aria-current="page"
                  href="index.html"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="service-html">
                  Services
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="contact.html">
                  Contact
                </a>
              </li>
              <button class="button2">Booking Lawyer</button>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
