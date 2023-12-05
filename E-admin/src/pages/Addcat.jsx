import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
// **************************Redux******************************
import { useDispatch, useSelector } from "react-redux";
// **************************Router dom*************************
import { useLocation, useNavigate } from "react-router-dom";
// **************************Toaster ***************************
import { toast } from "react-toastify";
// **************************Yup *******************************
import * as yup from "yup";
// ************************** Formik ***************************
import { useFormik } from "formik";
import {
  createCategoryonServer,
  getProductCateServer,
  resetState,
  updateProductCateServer,
} from "../features/pcategory/pcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category  is Required"),
});

const AddCat = () => {
  const {
    isError,
    isSuccess,
    isLoading,
    createdCategories,
    updatedProduct,
    getProuduct,
  } = useSelector((state) => state.pcategory);

  const location = useLocation();
  const getPcatId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getPcatId !== undefined) {
      dispatch(getProductCateServer(getPcatId));
    } else {
      dispatch(resetState());
    }
  }, [getPcatId]);

  useEffect(() => {
    if (isSuccess && createdCategories) {
      toast.success("Product Category Added Successfully !");
    }

    if (isSuccess && updatedProduct) {
      toast.success("Product Category Updated Successfully");
    }

    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: getProuduct || "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      if (getPcatId !== undefined) {
        const data = { id: getPcatId, productCateProduct: value.title };
        dispatch(updateProductCateServer(data));
        dispatch(resetState());
        navigate("/admin/category-list")

      } else {
        dispatch(createCategoryonServer(value));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <>
      <div>
        <h3 className="mb-4 title">
          {getPcatId !== undefined ? "Edit" : "Add"} Category
        </h3>
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
              {getPcatId !== undefined ? "Edit Brand" : "Add Brand"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCat;
