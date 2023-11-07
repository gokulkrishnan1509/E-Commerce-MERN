import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Prodcompare from "../images/prodcompare.svg";
import Wish from "../images/wish.svg";
import WishList from "../images/wishlist.svg";
import Watch from "../images/watch.jpg";
import Watch2 from "../images/speaker.jpg";
import addCart from "../images/add-cart.svg";
import view from "../images/view.svg";

const ProductCard = (props) => {
  const { grid } = props;
  const navigate = useNavigate();
  let location = useLocation();
  return (
    <>
      <div
        className={`${
          location.pathname == "/product" ? `gr-${grid}` : "col-3 mt-3"
        }`}
      >
        <div
          onClick={() => {
            
         const newPath=   `${
              location.pathname == "/"
                ? "/product/:id"
                : location.pathname == "/product/:id"
                ? "/product/:id"
                : ":id"
            }`;
            navigate(newPath)
          }}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src={Wish} alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img src={Watch} className="img-fluid" alt="product-image" />
            <img src={Watch2} className="img-fluid" alt="product-image" />
          </div>
          <div className="product-details">
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              Kids headphones bulk 10 multi colored for students
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            ></ReactStars>
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
              reiciendis nam accusamus eius.
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <Link>
                <img src={addCart} alt="products" />
              </Link>
              <Link>
                <img src={view} alt="products" />
              </Link>

              <Link>
                <img src={addCart} alt="products" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          location.pathname == "/product" ? `gr-${grid}` : "col-3 mt-3"
        }`}
      >
        <div
          onClick={() => {
           const newPath= `${
              location.pathname == "/"
                ? "product/:id"
                : location.pathname == "/product/:id"
                ? "/product/:id"
                : ":id"
            }`;
            navigate(newPath)
          }}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src={Wish} alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img src={Watch} className="img-fluid" alt="product-image" />
            <img src={Watch2} className="img-fluid" alt="product-image" />
          </div>
          <div className="product-details">
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              Kids headphones bulk 10 multi colored for students
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            ></ReactStars>
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
              reiciendis nam accusamus eius.
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <Link>
                <img src={addCart} alt="products" />
              </Link>
              <Link>
                <img src={view} alt="products" />
              </Link>

              <Link>
                <img src={addCart} alt="products" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
