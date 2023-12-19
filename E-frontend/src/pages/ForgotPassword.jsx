import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { getForgotPasswordToken } from "../../features/user/userSlice";

const emailSchema = yup.object({
  email: yup
    .string()
    .email("Email Should be valid")
    .required("Email Address is Required"),
});

const ForgotPassword = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(getForgotPasswordToken(values));
    },
  });
  return (
    <>
      <Meta title={"Forgot Password"}></Meta>
      <BreadCrumb title="Forgot Password" />

      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Reset Your Password</h3>
                <p className="text-center my-2 mb-3">
                  We will send you an email to reset your password
                </p>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-30"
                >
                  <div>
                    <CustomInput
                      type="text"
                      name="Email"
                      placeholder="Email"
                      className="form-control"
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      value={formik.values.email}
                    />
                    <div className="error text-center">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>

                  <div>
                    <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                      <button
                        className="button border-0 text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                      <Link to="/login" className="a">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
