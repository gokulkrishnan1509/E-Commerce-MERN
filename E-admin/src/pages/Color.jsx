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
  createColorToDb,
  getOneColorFromDb,
  resetState,
  updateColorToServer,
} from "../features/color/colorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});

const Addcolor = () => {
  const {
    isSuccess,
    isError,
    isLoading,
    colorTitle,
    createdColor,
    updatedColor,
  } = useSelector((state) => state.color);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getColorId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getOneColorFromDb(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully");
    }

    if (isSuccess && updatedColor && !createdColor) {
      toast.success("Color Updated Successfully");
      // navigate("/admin/color-list");
    }

    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isError, isSuccess, createdColor, updatedColor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorTitle || "#000000",
      // color:"#000000"
    },
    validationSchema: schema,
    onSubmit: (value) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: value };
        dispatch(updateColorToServer(data));
        dispatch(resetState());
      } else {
        dispatch(createColorToDb(value));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <>
      <div>
        <h3 className="mb-4 title">
          {getColorId !== undefined ? "Edit" : "Add"} Color
        </h3>
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
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              {getColorId !== undefined ? "Edit Color" : "Add Color"}
            </button>
          </form>
          ``
        </div>
      </div>
    </>
  );
};
export default Addcolor;
