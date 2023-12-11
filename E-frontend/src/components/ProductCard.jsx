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
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist } from "../../features/products/productSlice";


const ProductCard = (props) => {
  const { grid, data } = props;
  const navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();
  const addToWishlist = (id) => {
    dispatch(addProductToWishlist(id));
  };
  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname == "/product" ? `gr-${grid}` : "col-3 mt-3"
            }`}
          >
            <div
              // onClick={() => {
              //   const newPath = `${
              //     location.pathname == "/"
              //       ? "/product/:id"
              //       : location.pathname == "/product/:id"
              //       ? "/product/:id"
              //       : ":id"
              //   }`;
              //   navigate(newPath);
              // }}
              className="product-card position-relative"
            >
              <div className="wishlist-icon position-absolute">
                <button
                  className="border-0 bg-transparent"
                  onClick={() => {
                    addToWishlist(item?._id);
                  }}
                >
                  <img src={Wish} alt="wishlist" />
                </button>
              </div>
              <div className="product-image">
                <img
                  src={item?.images[0]?.url}
                  className="img-fluid  mx-auto"
                  width={160}
                  alt="product-image"
                />
                <img
                  src={Watch2}
                  className="img-fluid  mx-auto"
                  width={160}
                  alt="product-image"
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.brand}</h6>
                <h5 className="product-title">{item?.title}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={Number(item?.totalrating)}
                  edit={false}
                  activeColor="#ffd700"
                ></ReactStars>
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">{item?.price}</p>
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
        );
      })}
    </>
  );
};

export default ProductCard;
