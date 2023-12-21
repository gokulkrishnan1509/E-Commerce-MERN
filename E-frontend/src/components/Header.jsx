import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import cart from "../images/cart.svg";
import wishList from "../images/wishlist.svg";
import user from "../images/user.svg";
import compare from "../images/compare.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getSingleProductFromServer } from "../../features/products/productSlice";

function Header() {
  const dispatch = useDispatch();
  const { getUserCartProduct } = useSelector((state) => state?.auth);
  const authState = useSelector((state) => state?.auth);
  
  const { Products } = useSelector((state) => state?.product);
  // console.log(Products)

  const [productOpt, setProductOpt] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(null);
  // *********below codes based for search functionality*************
  const [paginate, setPaginate] = useState(true);

  // ****************************************************************

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < getUserCartProduct?.length; index++) {
      sum =
        sum +
        Number(
          getUserCartProduct[index]?.quantity *
            Number(getUserCartProduct[index]?.price)
        );
      setTotal(sum);
    }
  }, [getUserCartProduct]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < Products?.length; index++) {
      const element = Products[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [Products]);

  const handleLogout = function () {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row d-flex align-items-center">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <Link className="text-white a " to="tel: +91 0987654321">
                  +91 0987654321
                </Link>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row my-3">
            <div className="col-2">
              <h2>
                <Link className="text-white a">E-commerce</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group ">
                {/* <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                /> */}
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  options={productOpt}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getSingleProductFromServer(selected[0]?.prod));
                  }}
                  paginate={paginate}
                  labelKey={"name"}
                  minLength={2}
                  placeholder="Search for Products here..."
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  <BsSearch className="fs-4" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  {/* <Link
                    to="/compare-product"
                    className="a d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br />
                      Products
                    </p>
                  </Link> */}
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="a d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishList} alt="wishlist" />
                    <p className="mb-0" style={{fontSize:"15px"}}>
                      Favourite
                      wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "/my-profile"}
                    className="a d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                    {authState?.user === null ? (
                      <p className="mb-0">
                        Log in <br /> My Account
                      </p>
                    ) : (
                      <p className="mb-0">
                        {authState?.user?.name}
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="a d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {getUserCartProduct?.length
                          ? getUserCartProduct?.length
                          : 0}
                      </span>
                      <p className="mb-0">$ {total ? total : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="menu-items" />

                      <span className="me-5 ">Shop Catagories</span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="#">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="#">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="#">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15  ">
                    {/* NavLink is similar to (a tag) */}
                    <NavLink to="/" className="a">
                      Home
                    </NavLink>
                    <NavLink to="/product" className="a">
                      Our Store
                    </NavLink>
                    <NavLink to="/my-orders" className="a">
                      My Orders
                    </NavLink>
                    <NavLink to="/blogs" className="a">
                      Blogs
                    </NavLink>
                    <NavLink to="/contact" className="a">
                      Contact
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="border border-0 bg-transparent text-white  text-uppercase"
                      type="button"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
