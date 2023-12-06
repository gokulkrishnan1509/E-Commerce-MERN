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

import {
  createBlogCate,
  getOneBlogCateFromServer,
  resetState,
  updateOneBlogCateFromServer,
} from "../features/blogcate/blogcateSlice";

let schema = yup.object().shape({
  title: yup.string().required(" Category Name is Required"),
});

const Addblogcat = () => {
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlogCategory,
    getOneBlog,
    updatedBlog,
  } = useSelector((state) => state.blogscategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBlogCateId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBlogCateId !== undefined) {
      dispatch(getOneBlogCateFromServer(getBlogCateId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCateId]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: getOneBlog || "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      if (getBlogCateId !== undefined) {
        const data = { id: getBlogCateId, brandData: value };
        dispatch(updateOneBlogCateFromServer(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCate(value));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Category Added Successfully");
    }

    if (updatedBlog && isSuccess) {
      toast.success("Blog Category Successfully");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <>
      <div>
        <h3 className="mb-4 title">
          {getBlogCateId !== undefined ? "Edit" : "Add"} Blog Category
        </h3>
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
              {getBlogCateId !== undefined
                ? " Edit Blog Category"
                : "Add Blog Category"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Addblogcat;
