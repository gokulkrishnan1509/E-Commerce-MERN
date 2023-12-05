import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
// **************************Redux******************************
import { useDispatch, useSelector } from "react-redux";
// **************************Router dom*************************
import { useNavigate, useLocation, useParams } from "react-router-dom";
// **************************Toaster ***************************
import { toast } from "react-toastify";
// **************************Yup *******************************
import * as yup from "yup";
// ************************** Formik ***************************
import { useFormik } from "formik";

import {
  createBrand,
  resetState,
  getoneBrandFromServer,
  updateBrandToServer,
} from "../features/brand/brandSlice";
import { createReducer } from "@reduxjs/toolkit";

let schema = yup.object().shape({
  title: yup.string().required("Brand is Required"),
});

const Addbrand = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const {
    createdBrand,
    isSuccess,
    isError,
    isLoading,
    brandName,
    updatedBrand,
  } = useSelector((state) => state.brand);

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getoneBrandFromServer(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  // useEffect(() => {
  //   if (getBrandId !== undefined && brandName) {
  //     formik.setValues({ title: brandName }); // Set the initial value using setValues
  //   }
  // }, [brandName, getBrandId]);

  // const {id} =useParams();

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully !");
    }

    if (updatedBrand && isSuccess) {
      toast.success("Brand Updated Successfully !");
      navigate("/admin/list-brand");
    }

    if (isError) {
      toast.error("Something Went Wrong !");
    }
  }, [isSuccess, isError, isLoading, updatedBrand]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: value };
        dispatch(updateBrandToServer(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(value));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <>
      <div>
        <h3 className="mb-4 title">
          {getBrandId !== undefined ? "Edit" : "Add"} Brand
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Brand"
            id="Enterbrand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBrandId !== undefined ? "Edit Brand" : "Add Brand"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Addbrand;
