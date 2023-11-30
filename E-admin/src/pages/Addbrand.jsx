import React from "react";
import CustomInput from "../components/CustomInput";
// **************************Redux******************************
import { useDispatch, useSelector } from "react-redux";
// **************************Router dom*************************
import { useNavigate } from "react-router-dom";
// **************************Toaster ***************************
import { toast } from "react-toastify";
// **************************Yup *******************************
import * as yup from "yup";
// ************************** Formik ***************************
import { useFormik } from "formik";
import { createBrand } from "../features/brand/brandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});

const Addbrand = () => {
  const {createdBrandDB} = useSelector((state)=>state.product)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      dispatch(createBrand(value));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-brand");
      }, 3000);
    },
  });

  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Brand</h3>
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
            Add Brand
          </button>
        </form>
      </div>
    </>
  );
};

export default Addbrand;
