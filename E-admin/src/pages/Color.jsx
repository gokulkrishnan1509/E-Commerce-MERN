import React from "react";
import CustomInput from "../components/CustomInput";

const Addcolor = () => {
  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Color</h3>
        <div>
          <form>
            <CustomInput type="color" label="Enter Color" id="entercolor" />
            <button className="btn btn-success border-0 rounded-3 my-5">Add Color</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Addcolor;
