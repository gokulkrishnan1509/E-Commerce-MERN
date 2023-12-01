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
import { createCategoryonServer } from "../features/pcategory/pcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category  is Required"),
});

const AddCat = () => {
  const { isError, isSuccess, isLoading } = useSelector(
    (state) => state.pcategory
  );

  useEffect(() => {
    if (isSuccess) {
      // toast.success("Product Category Added Successfully !");
    }

    if (isError) {
      // toast.error("Something Went Wrong");
    }
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      dispatch(createCategoryonServer(value));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/category-list");
      }, 3000);
    },
  });

  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Category</h3>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              name="title"
              label="Add Category"
              id="Addcat"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <button className="btn btn-success border-0 rounded-3 my-5">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCat;
