import React from "react";
import {Link} from "react-router-dom"
import CustomInput from "../components/CustomInput";
function Login() {
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
            <form>
              <CustomInput type="text" label="Email Address" id="email" />
              <CustomInput type="text" label="password" id="pass" />
              <div className=" mb-3 text-end">
                <Link to="/forgot-password" className="text-decoration-none text-black m ">Forgot Password</Link>
              </div>
              <Link
               to="/admin"
                className="border-0 px-3 py-2 rounded-3 text-white text-center text-decoration-none fw-bold w-100"
                style={{ background: "#ffd333" }}
                type="submit"
              >
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
