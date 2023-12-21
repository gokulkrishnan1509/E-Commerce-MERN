import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Color from "../components/Color";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import {
  getAllProductsfromServer,
  getSingleProductFromServer,
  rateProductByUser,
} from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCartServer,
  getUserCartFromServer,
  resetState,
} from "../../features/user/userSlice";
// import ReactImageZoom from "react-image-zoom";

const SingleProduct = function () {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [color, setColor] = useState(null);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [ratings, setRatings] = useState([]);
  const getProductId = location.pathname.split("/")[2];
  const { singleProduct } = useSelector((state) => state?.product);
  const { getUserCartProduct } = useSelector((state) => state?.auth);
  const { Products } = useSelector((state) => state?.product);
  useEffect(() => {
    // Check if Products is an array before attempting to iterate
    if (Array.isArray(Products)) {
      let allRatings = [];

      for (let i = 0; i < Products.length; i++) {
        if (Array.isArray(Products[i].ratings)) {
          allRatings = allRatings.concat(Products[i].ratings);
        }

        setRatings(allRatings);
      }
    }
  }, [Products]);
  


 
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getAllProductsfromServer());
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  useEffect(() => {
    for (let index = 0; index < getUserCartProduct?.length; index++) {
      if (getProductId === getUserCartProduct[index]?.productId[0]?._id) {
        setAlreadyAdded(true);
      }
    }
  }, [getUserCartProduct]);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getSingleProductFromServer(getProductId));

      dispatch(getUserCartFromServer());
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, [getProductId]);
  const uploadCart = () => {
    if (color === null) {
      alert("please select color");
      return false;
    } else {
      // (singleProduct?._id);
      dispatch(
        addProductToCartServer({
          productId: singleProduct?._id,
          quantity,
          color,
          price: singleProduct?.price,
        })
      );
      navigate("/cart");
      // dispatch(resetState());
    }
  };

  const props = {
    width: 400,
    height: 250,
    img: singleProduct?.images[0]?.url
      ? singleProduct?.images[0]?.url
      : "https://www.thewowstyle.com/wp-content/uploads/2015/01/green-nature-backgrounds.jpeg",
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

  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < Products?.length; index++) {
      const element = Products[index];
      if (element.tags === "popular") {
        data.push(element);
      }
    }
    setPopularProduct(data);
  }, [Products]);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingToProduct = () => {
    if (star === null) {
      return false;
    } else if (comment === null) {
      return false;
    } else {
      dispatch(
        rateProductByUser({
          star: star,
          comment: comment,
          prodId: getProductId,
        })
      );
    }
  };

  return (
    <>
      <Meta title={`${singleProduct?.title}`} />
      <BreadCrumb title={`${singleProduct?.title}`} />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <img
                    src={props.img}
                    alt={singleProduct?.brand}
                    width={props.width}
                    height={props.height}
                  />
                </div>
              </div>
              <div className="other-product-images d-flex gap-15 flex-wrap">
                <div>
                  <img
                    src={props.img}
                    alt={singleProduct?.brand}
                    className="img-fluid"
                  />
                </div>
                <div>
                  <img
                    src={props.img}
                    alt={singleProduct?.brand}
                    className="img-fluid"
                  />
                </div>
                <div>
                  <img
                    src={props.img}
                    alt={singleProduct?.brand}
                    className="img-fluid"
                  />
                </div>
                <div>
                  <img
                    src={props.img}
                    alt={singleProduct?.brand}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{singleProduct?.title}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">$ {singleProduct?.price}</p>
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
                    <p className="product-data">{singleProduct?.brand}</p>
                  </div>

                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Catagory:</h3>{" "}
                    <p className="product-data">{singleProduct?.category}</p>
                  </div>

                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Tags :</h3>
                    <p className="product-data">{singleProduct?.tags}</p>
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
                  {alreadyAdded === false && (
                    <>
                      <div className="d-flex gap-10 flex-column mt-2 mb-3">
                        <h3 className="product-heading">Color:</h3>
                        <Color
                          setColor={setColor}
                          colorData={singleProduct?.color}
                        />
                      </div>
                    </>
                  )}
                  <div className="d-flex gap-10 flex-row mt-2 mb-3 align-items-center  ">
                    {alreadyAdded === false && (
                      <>
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
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                          />
                        </div>
                      </>
                    )}
                    <div
                      className={
                        alreadyAdded
                          ? "ms-0"
                          : "ms-5" +
                            `d-flex align-items-center gap-30 buynow ms-5`
                      }
                    >
                      {/* <button
                        className="button border-0 text-white"
                        type="button"
                      >
                        Buy it Now
                      </button> */}
                      <button
                        className="button Addtocart text-white"
                        onClick={() => {
                          alreadyAdded ? navigate("/cart") : uploadCart();
                        }}
                      >
                        {alreadyAdded ? "Go To Cart" : "Add to Cart"}
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
                      <Link href="#" className="a">
                        <AiOutlineHeart className="fs-5 me-2" />
                        Add to Wishlist
                      </Link>
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
                        copyToClipboard(window.location.href);
                      }}
                      className="a"
                    >
                      Copy Product Link
                    </a>
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
                <p
                  dangerouslySetInnerHTML={{
                    __html: singleProduct?.description.substr(0, 70),
                  }}
                ></p>
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
                        value={parseInt(singleProduct?.totalrating) || 0}
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
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e) => {
                        setStar(e);
                      }}
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
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      className="button border-0 text-white"
                      onClick={addRatingToProduct}
                      type="button"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
                <div className="reviews mt-4">
                {ratings && ratings?.map((item,index)=>{
                return(
                  <div key={index} className="review">
                  <div className="d-flex gap-10 align-items-center">
                  
                  <ReactStars 
                  
                  count={5}
                  size={24}
                  value={item?.star}
                  edit={false}
                  activeColor="#ffd700"
                  />
                  
                  </div>
                  
                  <p className="mt-3">{item?.comment}</p>
                  </div>
                )
                })}
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
              <ProductCard data={popularProduct} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
