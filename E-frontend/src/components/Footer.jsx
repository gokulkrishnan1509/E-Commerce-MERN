import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png"
function Footer() {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newletter" />
                <h2 className="mb-0 text-white">Sign up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text " id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  No: 333 Kamaraj Street,
                  <br />
                  Muthailpet, Pondicherry
                  <br />
                  PinCode:605004
                </address>

                <a
                  href=" tel:+91 0987654321"
                  className="a mt-3 text-white d-block mb-1"
                >
                  +91 9876543210
                </a>
                <a
                  href="mailto:patrick bateman1509@gmail.com"
                  className="a mt-2 text-white d-block mb-0"
                >
                  patrick bateman1509@gmail.com
                </a>
                <div className="social_icons text-white d-flex align-items-center gap-30 mt-4">
                  <a href="" className="text-white  ">
                    <BsLinkedin className="fs-4"></BsLinkedin>
                  </a>
                  <a href="" className="text-white">
                    <BsGithub className="fs-4"></BsGithub>
                  </a>
                  <a href="" className="text-white">
                    <BsInstagram className="fs-4"></BsInstagram>
                  </a>
                  <a href="" className="text-white">
                    <BsYoutube className="fs-4"></BsYoutube>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/privacy-policy" className="a text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="a text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="a text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to="/term-conditions" className="a text-white py-2 mb-1">
                  Terms & Conditions
                </Link>
                <Link className="a text-white py-2 mb-1"> Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="a text-white py-2 mb-1">About Us</Link>
                <Link className="a text-white py-2 mb-1">Faq</Link>
                <Link className="a text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4"> Quick Links</h4>
              <div className="footer-link d-flex flex-column ">
                <Link className=" a text-white py-2 mb-1"> Laptops</Link>
                <Link className="a text-white py-2 mb-1"> HeadPhones</Link>
                <Link className="a text-white py-2 mb-1">Tablets</Link>
                <Link className="a text-white py-2 mb-1"> Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}: Powered by Patrik
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
