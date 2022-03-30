import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <footer
        className="site-footer text-light"
        style={{ backgroundColor: "#111" }}
      >
        <div class="container px-4 py-5">
          <div class="row">
            <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
              <p
                className="author ps-3 "
                style={{
                  position: "relative",
                  fontWeight: "bold",
                  fontSize: "18px",
                  fontFamily: "sans-serif",
                }}
              >
                Writify
              </p>

              <p
                className="s-3"
                style={{ fontSize: "17px", textAlign: "justify" }}
              >
                Writify is found to give end user a trusted and verified
                platform to add their own written content which can be a blog ,
                shayari,  kavita, quote, joke, etc. Here the user can enjoy
                emotional and heart-touching shayaris , motivational quotes ,
                laughter cracking jokes and much more
              </p>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <ul class="list-unstyled mb-0"></ul>
            </div>

            <div
              className="col-lg-3 col-md-6 mb-4 mb-md-0 text-light"
              style={{ fontSize: "17px" }}
            >
              <ul className="list-unstyled text-light">
                <li className="py-2">
                  <Link
                    to="/about"
                    className="text-light text-capitalize"
                    style={{ textDecoration: "none" }}
                  >
                    about us
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    to="/contact"
                    className="text-light text-capitalize"
                    style={{ textDecoration: "none" }}
                  >
                    contact us
                  </Link>
                </li>

                <li className="py-2">
                  <Link
                    href="#!"
                    className="text-light text-capitalize"
                    style={{ textDecoration: "none" }}
                  >
                    privacy policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr style={{ color: "#e07624" }} />
        <div class="text-center p-3" style={{ fontSize: "17px" }}>
          ©2022 Copyright : &nbsp;
          <Link class="text-light" to="/" style={{ textDecoration: "none" }}>
            Writify
          </Link>
           </div>
      </footer>
    </div>
  );
};

export default Footer;
