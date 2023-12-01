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
import { useNavigate } from "react-router-dom";
// *****************Formik Form***********************
import * as yup from "yup";
import { useFormik } from "formik";
// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";
import { getBlogCate } from "../features/blogcate/blogcateSlice";
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
  const { images } = useSelector((state) => state.upload);
  const { blogcategory } = useSelector((state) => state.blogscategory);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getBlogCate());
    });

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  const img = [];

  images.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch();
      formik.resetForm();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
  });
  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Blog</h3>
        {/* <Stepper
          steps={[
            { label: "Add Blog Details " },
            { label: "Upload Images" },
            { label: "Finish" },
          ]}activeStep={2}
        /> */}

        <div className="">
          <form
            className="d-flex gap-3 flex-column"
            onSubmit={formik.handleSubmit}
          >
            <div className="mt-3">
              <CustomInput
                type="text"
                lable="Enter Blog Title"
                name=""
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                val={formik.values.title}
              />
            </div>
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <select name="" id="" className="form-control py-3 mb-3 mt-3">
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
            <button className="btn btn-success border-0 rounded-3 my-5">
              Add Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addblog;
