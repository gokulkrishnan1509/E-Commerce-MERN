import React from "react";

function CustomInput(props) {
  const { type, label, id, i_class, name, val, onChange, onBlur } = props;
  return (
    <>
      <div className="form-floating mt-3">
        <input
          type={type}
          className={`form-control ${i_class}`}
          id={id}
          placeholder={label}
          name={name}
          value={val}
          onChange={onChange}
          onBlur={onBlur}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  );
}

export default CustomInput;
