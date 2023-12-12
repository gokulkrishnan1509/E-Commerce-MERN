import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import BlogCards from "../components/BlogCards";
import ProductCard from "../components/ProductCard";
import SpecialProducts from "../components/SpecialProducts";
import Container from "../components/Container";
import { services } from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../features/blogs/blogSlice";
import moment from "moment";
import { getAllProductsfromServer } from "../../features/products/productSlice";
// *******************************************************************import { Link, useLocation, useNavigate } from "react-router-dom";
// import Prodcompare from "../images/prodcompare.svg";
import Wish from "../images/wish.svg";
import WishList from "../images/wishlist.svg";
// import Watch from "../images/watch.jpg";
// import Watch2 from "../images/speaker.jpg";
import addCart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addProductToWishlist } from "../../features/products/productSlice";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function Home() {
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state?.blog);
  const { Products } = useSelector((state) => state?.product);
  const navigate = useNavigate();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getAllBlogs());
      dispatch(getAllProductsfromServer());
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);
  // **************************Add to Wishlist******************************
  const addToWishlist = (id) => {
    dispatch(addProductToWishlist(id));
  };

  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        {/* <section className="home-wrapper-1 py-5"> */}
        {/* <div className="container-xxl"> */}
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative p-3">
              <img
                src="images/main-banner.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>ipad s13+ Pro.</h5>
                <p>From $999.00 or $42.62/mo</p>
                <Link className="button  a">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap justify-content-between gap-10 align-items-center">
              <div className="small-banner position-relative ">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="images"
                />

                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br />
                    or $41.62/mo.
                  </p>
                </div>
              </div>

              <div className="small-banner position-relative  ">
                <img
                  src="images/catbanner-02.jpg "
                  alt="images"
                  className="img-fluid rounded-3"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>

              <div className="small-banner position-relative   ">
                <img
                  src="images/catbanner-03.jpg"
                  alt="images"
                  className="img-fluid rounded-3"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br /> or $41.63/mo.
                  </p>
                </div>
              </div>

              <div className="small-banner position-relative  ">
                <img
                  src="images/catbanner-04.jpg"
                  alt="images"
                  className="img-fluid rounded-3"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br />
                    or $41.53/mo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </section> */}
      </Container>

      <Container class1="home-wrapper-2 py-5 section">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((data, index) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={index}>
                    <img src={data.image} alt="services" />
                    <div>
                      <h6>{data.title}</h6>
                      <p className="mb-0">{data.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="catagories d-flex justify-content-between  flex-wrap align-items-center">
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="products" />
                </div>
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="products" />
                </div>
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="products" />
                </div>
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Smart Watches</h6>
                    <p> 10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="products" />
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="products" />
                </div>

                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="products" />
                </div>
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="products" />
                </div>
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="products" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Collection</h3>
            </div>
            {Array.isArray(Products) &&
                Products?.map((item, index) => {
                  if (item.tags === "features") {
                    return (
                      <div key={index} className={"col-3"}>
                        <div className="product-card position-relative ">
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
                              // src={item?.images[0]?.url}
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
                            {/* <p
                              className={`description ${
                                grid === 12 ? "d-block" : "d-none"
                              }`}
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            ></p> */}
                            <p className="price">{item?.price}</p>
                          </div>
                          <div className="action-bar position-absolute">
                            <div className="d-flex flex-column gap-15">
                              <Link>
                                <img src={addCart} alt="products" />
                              </Link>
                              <Link  to={`/product/${item?._id}`}>
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
                  }
                })}
          </div>
        </div>
      </section>

      <section className="famous-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/subbanner-01.webp"
                  className="img-fluid"
                  alt="product"
                />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series</h6>
                  <p>From $399or $16.62/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>

            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/subbanner-02.webp"
                  alt="products"
                  className="img-fluid"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Studio Display</h5>
                  <h6 className="text-dark">600 nits of brightness.</h6>
                  <p className="text-dark">27-inch 5K Retina display</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/subbanner-03.webp"
                  alt="products"
                  className="img-fluid"
                />

                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Smart Phones</h5>
                  <h6 className="text-dark">SmartPhone 13 Pto.</h6>
                  <p className="text-dark">
                    Now in Green. From $999.00 or $41.62/mo. for 24mo.Footnote*{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/subbanner-04.webp"
                  alt="products"
                  className="img-fluid"
                />

                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Home Speakers</h5>
                  <h6 className="text-dark">Room-filling Sound</h6>
                  <p className="text-dark">
                    From $699 or $166.58/mo. for 12 mo.*
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row ">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
          </div>
          <div className="row ">
            {Products &&
              Products?.map((data, index) => {
                if (data?.tags === "special") {
                  return (
                    <SpecialProducts
                      key={index}
                      id={data?._id}
                      title={data?.title}
                      brand={data?.brand}
                      totalrating={data?.totalrating}
                      price={data?.price}
                      sold={data?.sold}
                      quantity={data?.quantity}
                    />
                  );
                }
              })}
          </div>
        </div>
      </section>

      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="section-heading">Our Popular Products</div>
            </div>
            <div className="row">
              {Array.isArray(Products) &&
                Products?.map((item, index) => {
                  if (item.tags === "popluar") {
                    return (
                      <div key={index} className={"col-3"}>
                        <div className="product-card position-relative ">
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
                              // src={item?.images[0]?.url}
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
                            {/* <p
                              className={`description ${
                                grid === 12 ? "d-block" : "d-none"
                              }`}
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            ></p> */}
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
                  }
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="marque-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className=" w-25">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Latest Blogs</h3>
            </div>
          </div>
          <div className="row">
            {blog &&
              blog.map((item, index) => {
                if (index < 3) {
                  return (
                    <div className="col-3 " key={index}>
                      <BlogCards
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        image={item?.images[0]?.url}
                        date={moment(item?.createdAt).format(
                          "YYYY-MM-DD,h:mm a"
                        )}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
