import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, className } = props;
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`'form-control' ${className}`}
      />
    </>
  );
};
export default CustomInput;
