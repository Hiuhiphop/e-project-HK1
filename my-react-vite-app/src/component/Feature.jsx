import React from "react";
import "../../public/assets/style/feature.css"


export default function Feature() {
  return (
    <>
      <section class="feature">
        <div class="container">
          <div class="title">
            <p>WHY CHOOSE US</p>
            <h3>
              Comprehensive Legal Solutions for Individuals and Businesses
            </h3>
          </div>
          <div class="content">
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia Curae; Nulla mollis dapibus nunc, ut rhoncus
              turpis sodales quis. Integer sit amet mattis quam.
            </p>
          </div>
          <div class="items">
            <div class="feature-items">
              <a href="">
                <img src="./assets/img/s1.png" alt="" />
                <h3>Interactive</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium tempora rerum perspiciatis?
                </p>
              </a>
            </div>

            <div class="feature-items">
              <a href="service.html">
                <img src="./assets/img/s2.png" alt="" />
                <h3>Business</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium tempora rerum perspiciatis?
                </p>
              </a>
            </div>

            <div class="feature-items">
              <a href="service.html">
                <img src="./assets/img/s3.png" alt="" />
                <h3>Interactive</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium tempora rerum perspiciatis?
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
