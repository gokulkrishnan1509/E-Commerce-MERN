import React from "react";

const CustomInput = (props) => {
  const {
    type,
    name,
    placeholder,
    label,
    id,
    i_class,
    value,
    onChange,
    onBlur,
  } = props;
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${i_class}`}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};
export default CustomInput;
