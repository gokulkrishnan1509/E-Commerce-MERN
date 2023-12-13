import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deletUserCartFromServer, getUserCartFromServer } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const dispatch = useDispatch();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getUserCartFromServer());
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const { getUserCartProduct } = useSelector((state) => state.auth);
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className=" cart-header d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>
              {getUserCartProduct &&
                getUserCartProduct?.map((item, index) => {
                  const { brand, title, images, price } = item?.productId[0];
                  return (
                    <div
                      key={index}
                      className="cart-data d-flex mb-2 justify-content-between align-items-center"
                    >
                      <div className="cart-col-1 gap-15 d-flex align-items-center">
                        <div className="w-25">
                          <img
                            src={watch}
                            className="img-fluid"
                            alt="product-image"
                          />
                        </div>
                        <div className="w-75">
                          <p>{title}</p>

                          <p className="d-flex gap-10">
                            color
                            <span
                              style={{
                                backgroundColor: item?.color[0]?.title,
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                              }}
                            ></span>
                          </p>
                        </div>
                      </div>
                      <div className="cart-col-2">
                        <h5 className="price">{item?.price}</h5>
                      </div>
                      <div className="cart-col-3 d-flex align-items-center gap-15">
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            name=""
                            id=""
                            min={1}
                            max={10}
                            defaultValue={item?.quantity}
                          />
                        </div>
                        <div  onClick={() => {
                              dispatch(deletUserCartFromServer(item?._id));
                            }}>
                          <AiFillDelete
                           
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="cart-col-4">
                        <h5 className="price">
                          {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button a">
                  Continue To Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: $1000</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button a">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
