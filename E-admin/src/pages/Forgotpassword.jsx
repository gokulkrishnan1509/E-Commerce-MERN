import React from "react";
import CustomInput from "../components/CustomInput";
const Forgotpassword = () => {
  return (
    <>
      <div
        className="py-5"
        style={{ background: "#ffd333", minHeight: "100vh" }}
      >
        <div className="pt-5">
          <div className="my-5  col-lg-3 col-12 bg-white  mx-auto  p-4 rounded-3">
            <h3 className="text-center">Forgot Password</h3>
            <p className="text-center">Please Enter your register email</p>
            <form>
              <CustomInput type="text" label="Email" id="email" />
              <button
                className="border-0 px-3 py-2 rounded-3 text-white fw-bold w-100"
                style={{ background: "#ffd333" }}
                type="submit"
              >
                Send Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
