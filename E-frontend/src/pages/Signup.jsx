import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetState } from "../../features/user/userSlice";

const signupSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup.string().required("Email is Required"),
  mobile: yup.string().required("Mobile No is Required"),
  password: yup.string().required("Password is Required"),
});

const Signup = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state)=>state?.auth)
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      dispatch(resetState());

    },
  });

  // useEffect(()=>{
  //   if(authState?.createdUser !==null && authState.isError ==false){
  //     navigate("/login")

  //   }
  // },[authState])
  return (
    <>
      <Meta title={"Signup"}></Meta>
      <BreadCrumb title="Signup" />

      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Sign Up</h3>
                <form
                  className="d-flex flex-column gap-10"
                  onSubmit={formik.handleSubmit}
                >
                  <CustomInput
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                  />
                  <div className="error">
                    {formik.touched.name && formik.errors.name}
                  </div>
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <CustomInput
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>

                  <div className="mt-1">
                    <CustomInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                    />
                    <div className="error">
                      {formik.touched.password && formik.errors.password}
                    </div>
                  </div>

                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button
                        className="button border-0 text-white"
                        type="submit"
                      >
                        Sign Up
                      </button>
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

export default Signup;
