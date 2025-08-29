import React from 'react'

export default function footer() {
  return (
    <>
      <footer class="footer">
        <div class="container">
          <div class="items d-flex justify-content-between">
            <div class="footer-items">
              <h3 class="fw-bold fs-5 mb-4">Company</h3>
              <div class="footer-list d-flex flex-column">
                <a href="">Home</a>
                <a href="">About</a>
                <a href="">Services</a>
                <a href="">Blog</a>
                <a href="">Contact Us</a>
              </div>
            </div>

            <div class="footer-items">
              <h3 class="fw-bold fs-5 mb-4">Useful Links</h3>
              <div class="footer-list d-flex flex-column">
                <a href="">Case Studies</a>
                <a href="">Our Branches</a>
                <a href="">Latest Media</a>
                <a href="">About Company</a>
                <a href="">Our People</a>
              </div>
            </div>

            <div class="footer-items">
              <h3 class="fw-bold fs-5 mb-4">Our Services</h3>
              <div class="footer-list d-flex flex-column">
                <a href="">Privacy Policy</a>
                <a href="">Our Terms</a>
                <a href="">Services</a>
                <a href="">Landing Page</a>
                <a href="">Our People</a>
              </div>
            </div>

            <div class="footer-items">
              <h3 class="fw-bold fs-5 mb-4">Newsletter</h3>
              <div class="footer-form">
                <p>Get latest updates and offers.</p>
                <form action="#" class="d-flex justify-content-between mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                  />
                  <button type="submit" class="button2">GO</button>
                </form>
                <span
                  >Sign up for our latest news & articles. We won’t give you spam
                  mails.
                </span>
              </div>
            </div>
          </div>
          <div
            class="copyright d-flex justify-content-between align-items-center"
          >
            <div class="content">
              © 2025 OnLaw. All rights reserved | Designed by
              <a href="#"> HieuHipHop</a>
            </div>
            <div class="icon">
              <i class="fa-brands fa-facebook-f"></i>
              <i class="fa-brands fa-linkedin-in"></i>
              <i class="fa-brands fa-twitter"></i>
              <i class="fa-brands fa-google-plus-g"></i>
              <i class="fa-brands fa-github"></i>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
