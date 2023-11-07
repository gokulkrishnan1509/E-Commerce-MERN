import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Color from "../components/Color";
import { Link } from "react-router-dom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
// import ReactImageZoom from "react-image-zoom";

const SingleProduct = function () {
  const props = {
    width: 400,
    height: 250,
    img: "https://th.bing.com/th?id=OIP.2d6tc6uG5uYH2BdeJPfYfgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  };
  const [orderedProduct, setOrderedProduct] = useState(true);
  useEffect(() => {}, []);
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerHTML = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <img
                    src={props.img}
                    alt="Product"
                    width={props.width}
                    height={props.height}
                  />
                </div>
              </div>
              <div className="other-product-images d-flex gap-15 flex-wrap">
                <div>
                  <img src={props.img} alt="watch" className="img-fluid" />
                </div>
                <div>
                  <img src={props.img} alt="watch" className="img-fluid" />
                </div>
                <div>
                  <img src={props.img} alt="watch" className="img-fluid" />
                </div>
                <div>
                  <img src={props.img} alt="watch" className="img-fluid" />
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">Watch</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">$ 100</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">(2 Reviews)</p>
                  </div>
                  <a href="#review" className="a review-btn">
                    Write a Review
                  </a>
                </div>
                <div className=" py-3">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Type:</h3>{" "}
                    <p className="product-data">Gdd</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Brand:</h3>{" "}
                    <p className="product-data">Gdd</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Catagory:</h3>{" "}
                    <p className="product-data">Gdd</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Availablity:</h3>{" "}
                    <p className="product-data">Gdd</p>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Size:</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        S
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        M
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XL
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XXL
                      </span>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Color:</h3>
                    <Color />
                  </div>
                  <div className="d-flex gap-10 flex-row mt-2 mb-3 align-items-center  ">
                    <h3 className="product-heading ">Quantity:</h3>
                    <div>
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                      />
                    </div>
                    <div className="d-flex align-items-center gap-30 buynow ms-5">
                      <button
                        className="button border-0 text-white"
                        type="submit"
                      >
                        Buy it Now
                      </button>
                      <button className="button Addtocart text-white">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      <a href="#" className="a">
                        <TbGitCompare className="fs-5 me-2" /> Add to Compare
                      </a>
                    </div>
                    <div>
                      <a href="#" className="a">
                        <AiOutlineHeart className="fs-5 me-2" />
                        Add to Wishlist
                      </a>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column  my-3">
                    <h3 className="product-heading">Shipping & Returns :</h3>
                    <p className="product-data">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      <br />
                      Atque possimus corrupti illo ex sit eum beatae minima{" "}
                      <b>5-10 business days !</b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-3">
                    <h3 className="product-heading"> Product Link :</h3>
                    <a
                      href="#"
                      onClick={() => {
                        copyToClipboard(
                          "https://th.bing.com/th?id=OIP.2d6tc6uG5uYH2BdeJPfYfgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                        );
                      }}
                      className="a"
                    >Copy Product Link</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>

              <div className="bg-white p-3">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                  est cupiditate dignissimos nulla nesciunt et doloremque
                  similique. Iste perspiciatis, repellendus magni eius, fugit
                  autem sapiente ab nostrum doloribus hic obcaecati?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="reviews-wrapper  home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex gap-10 align-items-center">
                      <ReactStars
                        count={5}
                        size={24}
                        value={3}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0 ">Based on 2 Reviews</p>
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <a
                        href="#"
                        className="a text-dark text-decoration-underline mb-2 d-flex align-items-center"
                      >
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-3">
                  <h4>Write a Review</h4>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="4"
                        placeholder="Comments"
                        // className="form-control"
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="button border-0 text-white">
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
                <div className="reviews mt-4">
                  <div className="reviews-content">
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0 pb-0">Gokul</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>

                    <p className="mt-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Soluta eveniet iure optio perferendis odit earum
                      voluptate, nemo provident aut autem possimus. Ipsa
                      consequatur impedit dolorem placeat molestiae reiciendis
                      illo quod?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">Our Popular Products</div>
            </div>
            <div className="row">
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
