import React from "react";
import "../../public/assets/style/FAQ.css";

export default function FAQ() {
  return (
    <>
      <section class="faq">
        <div class="container">
          <div class="title text-center">
            <p>questions and answers</p>
            <h3>General FAQs</h3>
          </div>
          <div class="content text-center">
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia Curae; Nulla mollis dapibus nunc, ut rhoncus
              turpis sodales quis. Integer sit amet mattis quam.
            </p>
          </div>
          <div class="items d-flex justify-content-between">
            <div class="faq-left">
              <div class="faq-image">
                <img src="./assets/img/women.jpg" alt="" />
              </div>
            </div>
            <div class="faq-right">
              <div class="accordion-menu">
                <ul>
                  <li>
                    <input type="checkbox" defaultChecked />
                    <i class="arrow"></i>
                    <h2>There are many passages but the majority?</h2>
                    <p>
                      Voluptates amet earum velit nobis aliquam laboriosam nihil
                      debitis facere voluptatibus consectetur quae quasi fuga,
                      ad corrupti libero omnis sapiente non assumenda, incidunt
                      officiis eaque iste minima autem.
                    </p>
                  </li>
                  <li>
                    <input type="checkbox" defaultChecked />
                    <i class="arrow"></i>
                    <h2>Sed ut perspiciatis unde omnis?</h2>
                    <p>
                      Sit amet consectetur adipisicing elit. Voluptates amet
                      earum velit nobis aliquam laboriosam nihil debitis animi
                      vitae eos nisi laudantium. Tempore reiciendis ipsam culpa,
                      qui voluptates eveniet, incidunt officiis eaque iste
                      minima autem.
                    </p>
                  </li>
                  <li>
                    <input type="checkbox" defaultChecked />
                    <i class="arrow"></i>
                    <h2>At vero eos iusto odio ducimus qui?</h2>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptates amet earum velit nobis aliquam laboriosam nihil
                      quasi fuga, ad corrupti libero omnis sapiente non
                      assumenda excepturi aperiam animi vitae eos nisi
                      laudantium. Tempore reiciendis ipsam culpa, qui voluptates
                      eveniet, incidunt officiis eaque iste minima autem.
                    </p>
                  </li>
                  <li>
                    <input type="checkbox" defaultChecked />
                    <i class="arrow"></i>
                    <h2>We denounce with righteous?</h2>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptates amet earum velit nobis aliquam laboriosam nihil
                      debitis facere voluptatibus consectetur quae quasi fuga,
                      ad corrupti libero omnis sapiente non assumenda excepturi
                      aperiam iste minima autem.
                    </p>
                  </li>
                  <li>
                    <input type="checkbox" defaultChecked />
                    <i class="arrow"></i>
                    <h2>perspiciatis unde omnis?</h2>
                    <p>
                      Sit amet consectetur adipisicing elit. Voluptates amet
                      earum velit nobis aliquam laboriosam nihil debitis animi
                      vitae eos nisi laudantium. Tempore reiciendis ipsam culpa,
                      qui voluptates eveniet, incidunt officiis eaque iste
                      minima autem.
                    </p>
                  </li>
                  <li>
                    <input type="checkbox" defaultChecked />
                    <i class="arrow"></i>
                    <h2>At vero eos iusto odio ducimus qui?</h2>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptates amet earum velit nobis aliquam laboriosam nihil
                      quasi fuga, ad corrupti libero omnis sapiente non
                      assumenda excepturi aperiam animi vitae eos nisi
                      laudantium. Tempore reiciendis ipsam culpa, qui voluptates
                      eveniet, incidunt officiis eaque iste minima autem.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
