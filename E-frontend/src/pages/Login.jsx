import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { loginToserver, resetState } from "../../features/user/userSlice";

const loginSchema = yup.object({
  email: yup.string().required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginToserver(values));


      dispatch(resetState());
    },
  });


  useEffect(()=>{
     if((authState?.userLogged !==undefined )){
      navigate("/")
      // dispatch(resetState());

     }
  },[authState])
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Login</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-30"
                >
                  <div>
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
                  </div>
                  <div className="mt-1">
                    <CustomInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                    />
                    <div className="error">
                      {formik.touched.password && formik.errors.password}
                    </div>
                  </div>
                  <div>
                    <Link to="/forgot-password" className="a">
                      Forgot Password ?
                    </Link>
                    <div className=" mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button
                        className="button border-0 text-white"
                        type="submit"
                      >
                        Login
                      </button>
                      <Link
                        className=" a button signup text-white"
                        to="/signup"
                      >
                        SignUp
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

export default Login;
