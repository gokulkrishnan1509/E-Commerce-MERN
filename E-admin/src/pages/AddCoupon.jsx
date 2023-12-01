import React from "react";
import CustomInput from "../components/CustomInput";
// ************************Redux****************************
import { useDispatch, useSelector } from "react-redux";
// *********************Router dom *************************
import { useNavigate } from "react-router-dom";
// ********************To aster ***************************
import { toast } from "react-toastify";

// ******************************yup *****************
import * as yup from "yup";

import { useFormik } from "formik";
import { postCouponFromServer } from "../features/coupon/couponSlice";

let schema = yup.object().shape({
  name: yup.string().required("Coupon is Required"),
  expiry: yup.date().required("Expiry is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
});

function AddCoupon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, isLoading, createdCoupon } = useSelector(
    (state) => state.coupon
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      dispatch(postCouponFromServer(value));
      formik.resetForm();
      setTimeout(() => {
        // navigate()
      }, 3000);
    },
  });
  return (
    <>
      <div>
        <h3 className="mb-4 title"> Add Coupon</h3>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            val={formik.values.name}
            label="Enter Coupon"
            id="EnterCoupon"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput
            type="Date"
            name="expiry"
            onChange={formik.handleChange("expiry")}
            onBlur={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            label="Enter Expiry"
            id="Enter Expiry"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            name="discount"
            onChange={formik.handleChange("discount")}
            onBlur={formik.handleBlur("discount")}
            val={formik.values.discount}
            label="Enter Expiry Discount"
            id="Enter Discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCoupon;
