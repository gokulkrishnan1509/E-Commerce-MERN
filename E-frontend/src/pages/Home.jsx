import React from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCards from "../components/BlogCards";
import ProductCard from "../components/ProductCard";
import SpecialProducts from "../components/SpecialProducts";
import Container from "../components/Container";
import { services } from "../utils/Data";

function Home() {
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
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
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
            <SpecialProducts></SpecialProducts>
            <SpecialProducts></SpecialProducts>

            <SpecialProducts></SpecialProducts>
            <SpecialProducts></SpecialProducts>
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
            <div className="col-3">
              <BlogCards />
            </div>
            <div className="col-3">
              <BlogCards />
            </div>
            <div className="col-3">
              <BlogCards />
            </div>
            <div className="col-3">
              <BlogCards />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
