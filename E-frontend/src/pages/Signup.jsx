import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
const Signup = function () {
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
                <form className="d-flex flex-column gap-30">
                  <CustomInput
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                  />
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                  />
                  <CustomInput
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    className="form-control"
                  />

                  <div className="mt-1">
                    <CustomInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="form-control"
                    />
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
