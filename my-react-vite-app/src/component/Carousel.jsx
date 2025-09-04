import React from "react";

export default function Carousel() {
  return (
    <section className="carousel">
      <div className="container">
        <div className="carousel-left">
          <div className="title">
            <h3>Find the right Lawyer for Your Needs</h3>
          </div>
          <div className="content">
            <p>
              Need legal help but don't know where to start? Our platform
              connects you with experienced lawyers to guide you every step of
              the way.
            </p>
            <a href="about.html">
              <button className="button1">get started</button>
            </a>
          </div>
        </div>
        <div className="carousel-right">
          <img src="./assets/img/main.png" alt="" />
        </div>
      </div>
    </section>
  );
}
