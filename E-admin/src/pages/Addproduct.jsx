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
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";

// ************************React Dropzone*****************

import Dropzone from "react-dropzone";

// *************************Redux slice***********************
import { getBrands } from "../features/brand/brandSlice";
import { getCategory } from "../features/pcategory/pcategorySlice";
import { getColorsFromServer } from "../features/color/colorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required "),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  color: yup.array().required("Colors are Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);
  const { pCategory } = useSelector((state) => state.pcategory);
  const { colors } = useSelector((state) => state.color);
  const colorsWidget = [];

  colors.forEach((element) => {
    colorsWidget.push({
      _id: element._id,
      color: element.title,
    });
  });

  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getBrands());
      dispatch(getCategory());
      dispatch(getColorsFromServer());
      formik.values.color = color;
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      quantity: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // const [desc, setDesc] = useState();
  // const handleDesc = (e) => {
  //   setDesc(e);
  // };
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
            <Multiselect
              dataKey="id"
              name="color"
              textField="color"
              // defaultValue={[1]}
              // data={[
              //   { id: 1, color: "Red" },
              //   { id: 2, color: "Yellow" },
              //   { id: 3, color: "Blue" },
              //   { id: 4, color: "Orange" },
              // ]}
              data={colorsWidget}
              onChange={(e) => {
                return setColor(e);
              }}
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
              <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
