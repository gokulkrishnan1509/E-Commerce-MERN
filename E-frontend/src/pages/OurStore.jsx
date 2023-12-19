import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsfromServer } from "../../features/products/productSlice";
const OurStore = () => {
  const [grid, setGrid] = useState(3);
  const { Products } = useSelector((state) => state?.product);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Filter
  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  console.log(sort);

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newTags = [];
    let newColors = [];

    for (let index = 0; index < Products?.length; index++) {
      const element = Products[index];
      newBrands.push(element.brand);
      category.push(element.category);
      newTags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
  }, [Products]);

  const dispatch = useDispatch();
  const getProduct = () => {
    dispatch(
      getAllProductsfromServer({
        sort,
        tag,
        brand,
        category,
        minPrice,
        maxPrice,
      })
    );
  };
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getProduct();
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
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
                    {categories &&
                      [...new Set(categories)].map((item, index) => {
                        return (
                          <li key={index} onClick={() => setCategory(item)}>
                            {item}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                {/* <div>
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
                </div> */}
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10 mb-3">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput-2"
                      name="loops"
                      placeholder=""
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput-2">From</label>
                  </div>

                  <div className="form-floating ">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput-1"
                      name="loops"
                      placeholder=""
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />

                    <label htmlFor="floatingInput-1">To</label>
                  </div>
                </div>
                {/* <h5 className="filter-title">Colors</h5>

                <div>
                  <Color />
                </div> */}
                {/* <h5 className="sub-title">Size</h5>
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
                </div> */}
              </div>
              <div className=" mb-3">
                <h3 className="sub-title">Product Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {tags &&
                      [...new Set(tags)].map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="text-capitalize badge bg-light text-secondary rounded-3 py-3 px-3"
                            onClick={() => {
                              setTag(item);
                            }}
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>

              <div className=" mb-3">
                <h3 className="sub-title">Product Brands</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {brands &&
                      [...new Set(brands)].map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="badge bg-light text-secondary rounded-3 py-3 px-3"
                            onClick={() => {
                              setBrand(item);
                            }}
                          >
                            {item}
                          </span>
                        );
                      })}
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
                    <select
                      defaultValue={"manual"}
                      name=""
                      className="form-control form-select"
                      id=""
                      onChange={(e) => setSort(e.target.value)}
                    >
                      {/* <option disabled value="manual">Select</option> */}
                      <option value="title">Alphabetically, A-Z</option>
                      <option value="-title">Alphabetically, Z-A</option>

                      <option value="price">Price ,low to high</option>
                      <option value="-price">Price, high to low</option>
                      <option value="createdAt">Date, old to new</option>
                      <option value="-createdAt">Date, new to old</option>
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
                  <ProductCard data={Products} grid={grid} />
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
