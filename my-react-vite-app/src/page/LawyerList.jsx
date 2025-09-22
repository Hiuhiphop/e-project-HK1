import React from "react";
import "../../public/assets/style/LawyerList.css";
import "../../public/assets/style/LawyerListCarousel.css";
import { NavLink } from "react-router-dom";

export default function LawyerList() {
  return (
    <>
      <section className="lawyerList">
        <section className="blog-card">
          <div className="container">
            <div className="card-wrap d-flex justify-content-between flex-wrap">
              <div className="blog-card-items w-100">
                <div className="card">
                  <img
                    src="./assets/img/lawyer-1.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div
                    className="card-body mx-2 p-5"
                    onClick={() => {
                      <Navigate to="/lawyerdetail" />;
                    }}
                  >
                    <h5 className="card-title fw-bold">
                      Corporate, Business & Digital Agencye
                    </h5>
                    <p className="card-text py-3">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <NavLink
                      to="lawyerdetail"
                      className={
                        "text-color1 fs-6 fw-bold pt-2 my-2 d-inline-block"
                      }
                    >
                      Know more
                      <i className="fa fa-arrow-right text-color1 fw-bold"></i>
                    </NavLink>
                  </div>
                  <div className="card-footer">
                    <button className="button2">Booking</button>
                  </div>
                </div>
              </div>
              <div className="blog-card-items w-100">
                <div className="card">
                  <img
                    src="./assets/img/lawyer-1.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div
                    className="card-body mx-2 p-5"
                    onClick={() => {
                      <Navigate to="/lawyerdetail" />;
                    }}
                  >
                    <h5 className="card-title fw-bold">
                      Corporate, Business & Digital Agencye
                    </h5>
                    <p className="card-text py-3">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <NavLink
                      to="lawyerdetail"
                      className={
                        "text-color1 fs-6 fw-bold pt-2 my-2 d-inline-block"
                      }
                    >
                      Know more
                      <i className="fa fa-arrow-right text-color1 fw-bold"></i>
                    </NavLink>
                  </div>
                  <div className="card-footer">
                    <button className="button2">Booking</button>
                  </div>
                </div>
              </div>
              <div className="blog-card-items w-100">
                <div className="card">
                  <img
                    src="./assets/img/lawyer-1.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div
                    className="card-body mx-2 p-5"
                    onClick={() => {
                      <Navigate to="/lawyerdetail" />;
                    }}
                  >
                    <h5 className="card-title fw-bold">
                      Corporate, Business & Digital Agencye
                    </h5>
                    <p className="card-text py-3">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <NavLink
                      to="lawyerdetail"
                      className={
                        "text-color1 fs-6 fw-bold pt-2 my-2 d-inline-block"
                      }
                    >
                      Know more
                      <i className="fa fa-arrow-right text-color1 fw-bold"></i>
                    </NavLink>
                  </div>
                  <div className="card-footer">
                    <button className="button2">Booking</button>
                  </div>
                </div>
              </div>
              <div className="blog-card-items w-100">
                <div className="card">
                  <img
                    src="./assets/img/lawyer-1.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div
                    className="card-body mx-2 p-5"
                    onClick={() => {
                      <Navigate to="/lawyerdetail" />;
                    }}
                  >
                    <h5 className="card-title fw-bold">
                      Corporate, Business & Digital Agencye
                    </h5>
                    <p className="card-text py-3">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <NavLink
                      to="lawyerdetail"
                      className={
                        "text-color1 fs-6 fw-bold pt-2 my-2 d-inline-block"
                      }
                    >
                      Know more
                      <i className="fa fa-arrow-right text-color1 fw-bold"></i>
                    </NavLink>
                  </div>
                  <div className="card-footer">
                    <button className="button2">Booking</button>
                  </div>
                </div>
              </div>
              <div className="blog-card-items w-100">
                <div className="card">
                  <img
                    src="./assets/img/lawyer-1.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div
                    className="card-body mx-2 p-5"
                    onClick={() => {
                      <Navigate to="/lawyerdetail" />;
                    }}
                  >
                    <h5 className="card-title fw-bold">
                      Corporate, Business & Digital Agencye
                    </h5>
                    <p className="card-text py-3">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <NavLink
                      to="lawyerdetail"
                      className={
                        "text-color1 fs-6 fw-bold pt-2 my-2 d-inline-block"
                      }
                    >
                      Know more
                      <i className="fa fa-arrow-right text-color1 fw-bold"></i>
                    </NavLink>
                  </div>
                  <div className="card-footer">
                    <button className="button2">Booking</button>
                  </div>
                </div>
              </div>

              
            </div>

            <div class="pagination-wrap mt-5">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#">
                    <i class="fa fa-angle-double-left"></i>
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link active" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    <i class="fa fa-angle-double-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
