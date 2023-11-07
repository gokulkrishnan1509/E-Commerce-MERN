import React, { useState,useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
const OurStore = () => {
  const [grid, setGrid] = useState(3);

  useEffect(() => {
  }, []);


  return (
    <>
      <Meta title={"Out Store"}></Meta>
      <BreadCrumb title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row ">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Watch</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Avaliablity</h5>
                  <div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value=""
                        id="float-2"
                      />
                      <label className="form-check-lable" htmlFor="float-2">
                        In Stock (1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value=""
                        name="loops"
                        id="float-1"
                      />
                      <label className="form-check-lable" htmlFor="float-1">
                        Our of Stock (0)
                      </label>
                    </div>
                  </div>
                </div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10 mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput-2"
                      name="loops"
                      placeholder=""
                    />
                    <label htmlFor="floatingInput-2">From</label>
                  </div>

                  <div className="form-floating ">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput-1"
                      name="loops"
                      placeholder=""
                    />

                    <label htmlFor="floatingInput-1">To</label>
                  </div>
                </div>
                <h5 className="filter-title">Colors</h5>

                <div>
                <Color/>
                </div>
                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check ps-0">
                    <input
                      type="checkbox"
                      className="form-check-label"
                      value=""
                      name="loops"
                      id="color-1"
                    />
                    <label htmlFor="color-1" className="form-check-label">
                      S (2)
                    </label>
                  </div>
                  <div className="form-check ps-0">
                    <input
                      type="checkbox"
                      className="form-check-label"
                      name="loops"
                      value=""
                      id="color-2"
                    />
                    <label htmlFor="color-2" className="form-check-label">
                      {" "}
                      M (2)
                    </label>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Headphone
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Laptop
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Mobile
                    </span>

                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Vivo
                    </span>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Random Product</h3>
                <div>
                  <div className="random-products d-flex mb-3">
                    <div className="w-50">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$ 300</b>
                    </div>
                  </div>
                  <div className="random-products d-flex">
                    <div className="w-50">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$ 300</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort By:
                    </p>
                    <select defaultValue={"manual"} name="" className="form-control form-select" id="">
                      {/* <option disabled value="manual">Select</option> */}
                      <option  value="manual">Featured</option>
                      <option value="best-selling">Best selling</option>
                      <option value="title-ascending">
                        Alphabetically, A-Z
                      </option>

                      <option value="price-ascending">
                        Price ,low to high
                      </option>
                      <option value="price-descending">
                        Price, high to low
                      </option>
                      <option value="created-ascending">
                        Date, old to new
                      </option>
                      <option value="created-descending">
                        Date, new to old
                      </option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10 grid">
                    <p className="totalproducts mb-0">21 Products</p>
                    <div className="d-flex gap-10 align-items-center">
                      <img
                        src="images/gr4.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(3);
                        }}
                      />
                      <img
                        src="images/gr3.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(4);
                        }}
                      />
                      <img
                        src="images/gr2.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(6);
                        }}
                      />
                      <img
                        src="images/gr.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(12);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">

                <div className="d-flex gap-10 flex-wrap">
                <ProductCard  grid={grid}/>

                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
