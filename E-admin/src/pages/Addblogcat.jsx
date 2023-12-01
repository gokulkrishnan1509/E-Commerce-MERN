import React, { useEffect } from "react";
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

import { createBlogCate, resetState } from "../features/blogcate/blogcateSlice";

let schema = yup.object().shape({
  title: yup.string().required(" Category Name is Required"),
});

const Addblogcat = () => {
  const { isSuccess, isError, isLoading } = useSelector(
    (state) => state.blogscategory
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      dispatch(createBlogCate(value));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
      }, 3000);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Category Added Successfully");
    }

    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Blog Category</h3>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Enter Blog Category"
              id="Enterblog"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              Add Blog Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Addblogcat;
