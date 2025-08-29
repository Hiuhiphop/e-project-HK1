import React from "react";

export default function () {
  return (
    <>
      <section class="about">
        <div class="container">
          <div class="about-content mb-4">
            <div class="about-left">
              <div class="title2">
                <p>ABOUT OUR COMPANY</p>
                <h3>Crafting legal strategies for your business success</h3>
              </div>
              <div class="content">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
                  est repellendus illum harum quam nihil totam reprehenderit! Ut
                  sed eveniet quos! Asperiores officia, repudiandae similique
                  reiciendis, ab est magnam esse nesciunt ea fuga facere
                  voluptatem.
                </p>
              </div>
              <button class="button2">Read more</button>
            </div>
            <div class="about-right">
              <img
                src="./assets/img/about.jpg"
                alt=""
                class="shadow mb-5 rounded"
              />
            </div>
          </div>
          <div class="about-statistic d-flex justify-content-between">
            <div class="statisctic-items shadow rounded p-4">
              <h5 class="fs-6 fw-bold">Happy Customer</h5>
              <span class="counter fs-1 fw-bold">10458</span>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
                atque sed.
              </p>
            </div>

            <div class="statisctic-items shadow rounded p-4">
              <h5 class="fs-6 fw-bold">Winning Awards</h5>
              <span class="counter fs-1 fw-bold">890</span>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
                atque sed.
              </p>
            </div>

            <div class="statisctic-items shadow rounded p-4">
              <h5 class="fs-6 fw-bold">Completed Projects</h5>
              <span class="counter fs-1 fw-bold">5345</span>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
                atque sed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
