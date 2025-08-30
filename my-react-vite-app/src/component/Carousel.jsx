import React from "react";

export default function Carousel() {
  return (
    <section class="carousel">
      <div class="container">
        <div class="carousel-left">
          <div class="title">
            <h3>Find the right Lawyer for Your Needs</h3>
          </div>
          <div class="content">
            <p>
              Need legal help but don't know where to start? Our platform
              connects you with experienced lawyers to guide you every step of
              the way.
            </p>
            <a href="about.html">
              <button class="button1">get started</button>
            </a>
          </div>
        </div>
        <div class="carousel-right">
          <img src="./assets/img/main.png" alt="" />
        </div>
      </div>
    </section>
  );
}
