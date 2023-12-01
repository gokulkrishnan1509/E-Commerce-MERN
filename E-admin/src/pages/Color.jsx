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

import { createColorToDb } from "../features/color/colorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});

const Addcolor = () => {
  const { isSuccess, isError, isLoading } = useSelector((state) => state.color);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Color Added Successfully");
    }

    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isError, isSuccess, isLoading]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "#000000",
      // color:"#000000"
    },
    validationSchema: schema,
    onSubmit: (value) => {
      dispatch(createColorToDb(value));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/color-list");
      }, 3000);
    },
  });

  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Color</h3>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="color"
              label="Enter Color"
              id="entercolor"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              val={formik.values.title}
            />
              <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
            <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
              Add Color
            </button>
          </form>
          ``
        </div>
      </div>
    </>
  );
};
export default Addcolor;
