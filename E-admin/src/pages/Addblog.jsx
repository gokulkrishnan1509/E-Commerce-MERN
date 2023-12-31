import React, { useEffect, useState } from "react";
// ***************Components Folder***************
import CustomInput from "../components/CustomInput";

// ***************React Quill package **********************
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// ***********************Toaster ***************************
import { toast } from "react-toastify";

// *************************antd design******************************

import { Select } from "antd";

// ************************React Dropzone*****************

import Dropzone from "react-dropzone";
// ***************************Router Dom ****************
import { useNavigate, useLocation } from "react-router-dom";
// *****************Formik Form***********************
import * as yup from "yup";
import { useFormik } from "formik";
// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";
import { getBlogCate, resetState } from "../features/blogcate/blogcateSlice";
import {
  getOneBlogFromServer,
  postBlogs,
  updateOneBlogToServer,
} from "../features/blogs/blogSlice";
import { deleteImg, uploadImgtoServer } from "../features/upload/uploadSlice";

// ***************************yup validation**************************

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const blogId = location.pathname.split("/")[3];

  const { images } = useSelector((state) => state.upload);
  const { blogcategory } = useSelector((state) => state.blogscategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    updatedBlog,
    blogName,
    blogDesc,
    blogCategory,
    blogImages,
  } = useSelector((state) => state.blogs);

  // ***********************************useEffect()**********************
  const img = [];
  images.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    if (blogId !== undefined) {
      dispatch(getOneBlogFromServer(blogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [blogId,blogImages]);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully");
    }

    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfully");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getBlogCate());
    });

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  useEffect(() => {
    formik.values.images = img;
  }, []);
  // **********************************************************************
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (blogId !== undefined) {
        const data = { id: blogId, branData: values };
        dispatch(updateOneBlogToServer(data));
        dispatch(resetState());
      } else {
        dispatch(postBlogs(values));
        formik.resetForm();
        setTimeout(() => {
          navigate(resetState());
        }, 300);
      }
    },
  });
  return (
    <>
      <div>
        <h3 className="mb-4 title">
          {blogId !== undefined ? "Update" : "Add"} Blog
        </h3>

        <div className="">
          <form
            className="d-flex gap-3 flex-column"
            onSubmit={formik.handleSubmit}
          >
            <div className="mt-3">
              <CustomInput
                type="text"
                label="Enter Blog Title"
                name="title"
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                val={formik.values.title}
                id="title"
              />
            </div>
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <select
              name="category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
              id="category"
              className="form-control py-3 mb-3 mt-3"
            >
              <option value="" disabled>
                Select Blog Category
              </option>
              {blogcategory.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />

            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
            <div className="bg-white border-1 p-5 text-center">
              <Dropzone
                onDrop={(acceptedFiles) =>
                  dispatch(uploadImgtoServer(acceptedFiles))
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="showimages d-flex flex-wrap gap-3">
              {Array.isArray(images) &&
                images.length > 0 &&
                images?.map((i, j) => {
                  return (
                    <div className="position-relative" key={j}>
                      <button
                        type="button"
                        onClick={() => dispatch(deleteImg(i?.public_id))}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      ></button>
                      <img src={i.url} alt="images" width={200} height={200} />
                    </div>
                  );
                })}
            </div>
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              {blogId !== undefined ? "Update" : "Add"} Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addblog;
