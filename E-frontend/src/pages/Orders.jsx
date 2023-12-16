import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersFromServer } from "../../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.auth);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getUserOrdersFromServer());
    }, 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  return (
    <>
      <BreadCrumb title="My Orders" />
      <Meta title={"Orders"}></Meta>
      <section className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-3">
                  <h5> Order Id</h5>
                </div>

                <div className="col-3">
                  <h5> Total Amount</h5>
                </div>
                <div className="col-3">
                  <h5>Total Amount after Discount</h5>
                </div>
                <div className="col-3">
                  <h5>Status</h5>
                </div>
              </div>
            </div>
            <div className="col-12 mt-3">
              {userOrders &&
                userOrders?.map((item, index) => {
                  return (
                    <div className="row">
                      <div className="col-3">
                        <p> Order Id</p>
                      </div>

                      <div className="col-3">
                        <p> Total Amount</p>
                      </div>
                      <div className="col-3">
                        <p>Total Amount after Discount</p>
                      </div>
                      <div className="col-3">
                        <p>Status</p>
                      </div>
                      <div className="col-12">
                        <div className="row bg-secondary p-3">
                          <div className="col-3">
                            <p>Order Id</p>
                          </div>
                          <div className="col-3">
                            <p>Total Amount</p>
                          </div>
                          <div className="col-3">
                            <p>Total Amount after Discount</p>
                          </div>
                          <div className="col-3">
                            <p>Status</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Orders;

{
  /* <section className={props.class1}>
  <div className="container-xxl">{props.children}</div>
</section>; */
}
