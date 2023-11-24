import React from "react";

function CustomInput(props) {
  const { type, label, id, i_class } = props;
  return (
    <>
      <div className="form-floating mb-3">
        <input
          type={type}
          className={`form-control ${i_class}`}
          id={id}
          placeholder={label}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  );
}

export default CustomInput;
