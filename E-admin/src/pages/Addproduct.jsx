import React, { useEffect, useState } from "react";

// **************Invoked from Components************
import CustomInput from "../components/CustomInput";
// ***************React Quill package **********************
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// *****************Formik Form***********************
import * as yup from "yup";
import { useFormik } from "formik";
// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";

// ************************React Widgets*******************
// import Multiselect from "react-widgets/Multiselect";
// import "react-widgets/styles.css";

// ***********************Toaster ***************************
import { toast } from "react-toastify";

// *************************antd design******************************

import { Select } from "antd";

// ************************React Dropzone*****************

import Dropzone from "react-dropzone";
// ***************************Router Dom ****************
import { useNavigate } from "react-router-dom";

// *************************Redux slice***********************
import { getBrands } from "../features/brand/brandSlice";
import { getCategory } from "../features/pcategory/pcategorySlice";
import { getColorsFromServer } from "../features/color/colorSlice";
import { uploadImgtoServer, deleteImg } from "../features/upload/uploadSlice";
import { createProudcts } from "../features/product/productSlice";

// *******************************yup validation********************
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required "),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tags is required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Colors are Required"),

  quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brands } = useSelector((state) => state.brand);
  const { pCategory } = useSelector((state) => state.pcategory);
  const { colors } = useSelector((state) => state.color);
  const { images } = useSelector((state) => state.upload);
  const { createProudctsinDb, isSuccess, isError, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (isSuccess && createProudctsinDb ) {
      toast.success("Product Added Successfully !");
    }
    if (isError) {
      toast.error("Something Went Wrong !");
    }
  }, [isSuccess, isError, isLoading]);

  // ********************************************************************
  const colorsWidget = [];
  const img = [];

  colors.forEach((element) => {
    colorsWidget.push({
      // if we are using ant design we have to set the key name as (value && label)
      value: element._id,
      label: element.title,
    });
  });

  images.forEach((element) =>
    img.push({
      public_id: element.public_id,
      url: element.url,
    })
  );
  // ****************************************************************************

  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getBrands());
      dispatch(getCategory());
      dispatch(getColorsFromServer());
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProudcts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        navigate("/admin/product-list");
      }, 3000);
    },
  });
  const handleColors = (e) => {
    setColor(e);
  };
  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Product</h3>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex gap-3 flex-column"
          >
            <CustomInput
              type="text"
              label="Enter Product Title"
              name="title"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <div className="">
              <ReactQuill
                theme="snow"
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange("description")}
                // onBlur={formik.handleBlur("description")}
              />
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
            <CustomInput
              type="number"
              label="Enter Product Price"
              id="enter price"
              onChange={formik.handleChange("price")}
              onBlur={formik.handleBlur("price")}
              val={formik.values.price}
              name="price"
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
            <select
              name="brand"
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              value={formik.values.brand}
              className="form-control py-3 mb-3"
            >
              <option value="">Select Brand</option>
              {brands.map((item, j) => {
                return (
                  <option key={j} value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.brand && formik.errors.brand}
            </div>
            <select
              name="category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
              className="form-control py-3 mb-3"
            >
              <option value="">Select Category</option>
              {pCategory.map((item, j) => {
                return (
                  <option key={j} value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>

            <select
              name="tags"
              onChange={formik.handleChange("tags")}
              onBlur={formik.handleBlur("tags")}
              value={formik.values.tags}
              className="form-control py-3 mb-3"
            >
              <option disabled>Select Brand</option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>
            {/* <Multiselect
              dataKey="id"
              name="color"
              textField="color"
              defaultValue={[1]}
              data={[
                { id: 1, color: "Red" },
                { id: 2, color: "Yellow" },
                { id: 3, color: "Blue" },
                { id: 4, color: "Orange" },
              ]}
              data={colorsWidget}
              onChange={(e) => {
                return setColor(e);
              }}
            /> */}

            <Select
              mode="multiple"
              allowClear
              className="w-100"
              placeholder="Select colors"
              // defaultValue={color}
              onChange={(i) => handleColors(i)}
              options={colorsWidget}
            />
            <div className="error">
              {formik.touched.color && formik.errors.color}
            </div>

            <CustomInput
              id="quantity"
              type="number"
              name="quantity"
              label="Enter Product Quantity"
              onChange={formik.handleChange("quantity")}
              onBlur={formik.handleBlur("quantity")}
              val={formik.values.quantity}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
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
              type="submit"
              className="btn btn-success border-0 rounded-3 my-5"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Addproduct;
