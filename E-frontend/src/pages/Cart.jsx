import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  deletUserCartFromServer,
  getUserCartFromServer,
  updateUserCartQuantity,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const { getUserCartProduct } = useSelector((state) => state.auth);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getUserCartFromServer());
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
  let sum = 0;
  for (let index = 0; index < getUserCartProduct?.length; index++) {
    sum =
      sum +
      Number(getUserCartProduct[index]?.quantity) *
        getUserCartProduct[index]?.price;
        setTotalAmount(sum) 
  }
  }, [getUserCartProduct]);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateUserCartQuantity({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
    }
  }, [productUpdateDetail]);


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
                            onChange={(e) => {
                              setProductUpdateDetail({
                                cartItemId: item?._id,
                                quantity: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div
                          onClick={() => {
                            dispatch(deletUserCartFromServer(item?._id));
                          }}
                        >
                          <AiFillDelete className="text-danger" />
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
                {(totalAmount !==null || totalAmount !==0) && 
                  <div className="d-flex flex-column align-item">
                   <h4>SubTotal: $ {totalAmount}</h4>
                   <p>Taxes and shipping calulated at checkout </p>
                   <Link to="/checkout" className="button a text-center">
                    Checkout
                   </Link>
                  </div>
                
                }
             
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
   {/* <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: ${totalAmount}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button a">
                    Checkout
                  </Link> */}
                {/* </div> */}