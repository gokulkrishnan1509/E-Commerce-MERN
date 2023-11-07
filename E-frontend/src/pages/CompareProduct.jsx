import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Color from "../components/Color";
function CompareProduct() {
  return (
    <>
      <Meta title={"Compare Product"} />
      <BreadCrumb title="Compare Product" />
      <div className="compare-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />

                <div className="compare-product-image">
                  <img
                    src="images/watch.jpg"
                    className="img-fluid"
                    alt="watch"
                  />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                  </h5>
                  <h6 className="price mb-3 mt-3">$ 100</h6>
                  <div>
                    <div className="product-details">
                      <h5>Brand:</h5>
                      <p>Havels</p>
                    </div>
                    <div className="product-details">
                      <h5>Type:</h5>
                      <p>Havels</p>
                    </div>
                    <div className="product-details">
                      <h5>Avaliablity:</h5>
                      <p>Havels</p>
                    </div>
                    <div className="product-details">
                      <h5>Color:</h5>
                      <span className="mb-0  "><Color/></span>
                    </div>
                    <div className="product-details">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompareProduct;
