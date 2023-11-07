import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
const ShippingPolicy = function () {
  return (
    <>
      <BreadCrumb title="Shipping Policy" />
      <Meta title={"Shipping Policy"} />
      <section className="policy-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="shipping">

              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default ShippingPolicy;
