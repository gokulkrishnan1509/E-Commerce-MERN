import React, { useState } from "react";

// **************Invoked from Components************
import CustomInput from "../components/CustomInput";
// ***************React Quill package **********************
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// *****************Antd design***********************
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const Addproduct = () => {
  const [desc, setDesc] = useState();
  const handleDesc = (e) => [setDesc(e)];
  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Product</h3>
        <div>
          <form action="">
            <CustomInput type="text" label="Enter Product Title" />
            <div className="mb-3">
              <ReactQuill
                theme="snow"
                value={desc}
                onChange={(evt) => {
                  handleDesc(evt);
                }}
              />
            </div>
            <CustomInput type="number" label="Enter Product Price" />

            <select name="" className="form-control py-3 mb-3">
              <option value="">Select Brand</option>
            </select>
            <select name="" className="form-control py-3 mb-3">
              <option value="">Select Category</option>
            </select>

            <select name="" className="form-control py-3 mb-3">
              <option value="">Select Color</option>
            </select>
            <CustomInput type="text" />

            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
            <button className="btn btn-success border-0 rounded-3 my-5">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Addproduct;
