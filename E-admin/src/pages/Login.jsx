import React, { useEffect } from "react";

// **************React-Router-dom****************
import { Link, useNavigate ,useLocation} from "react-router-dom";
// ***************** Formik Forms ******************
import { useFormik } from "formik";

// *************** yup *********************
import * as Yup from "yup";

// *******************Redux *******************
import { useDispatch, useSelector } from "react-redux";

// ***************** Components folder *************
import CustomInput from "../components/CustomInput";

// *****************  features folder **************
import { login } from "../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email Should be valid")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // const userData = JSON.parse(localStorage.getItem("token"));
  // const userData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user,"gokul")

    // if (user  || isSuccess) {
    //   navigate("admin");
    // }else{
    //   navigate("/")
    // }

   
  }, []);
  return (
    <>
      <div
        className="py-5 "
        style={{ background: "#ffd333", minHeight: "100vh" }}
      >
        <div className="pt-5">
          <div className="my-5  col-lg-3  col-12  bg-white rounded-3 mx-auto  p-4">
            <h3 className="text-center">Login</h3>
            <p className="text-center">Login to you account to continue.</p>
            <form onSubmit={formik.handleSubmit}>
              <CustomInput
                type="text"
                name="email"
                label="Email Address"
                id="email"
                val={formik.values.email}
                onChange={formik.handleChange("email")}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>

              <CustomInput
                type="text"
                name="password"
                label="password"
                id="pass"
                val={formik.values.password}
                onChange={formik.handleChange("password")}
              />
              <div className="error">
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>

              <div className=" mb-3 text-end">
                <Link
                  to="/forgot-password"
                  className="text-decoration-none text-black m "
                >
                  Forgot Password
                </Link>
              </div>
              <button
                className="border-0 px-3 py-2 rounded-3 text-white text-center text-decoration-none fw-bold w-100"
                style={{ background: "#ffd333" }}
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
