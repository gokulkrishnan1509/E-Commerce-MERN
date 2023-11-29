import React, { useState } from "react";
// ***************Components Folder***************
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
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
  },
};

const Addblog = () => {
  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };
  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Blog</h3>
        {/* <Stepper
          steps={[
            { label: "Add Blog Details " },
            { label: "Upload Images" },
            { label: "Finish" },
          ]}activeStep={2}
        /> */}

        <div className="">
          <form action="">
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
            <div className="mt-3">
              <CustomInput type="text" lable="Enter Blog Title" />
            </div>
            <select name="" id="" className="form-control py-3 mb-3">
              <option value="">Select Blog Category</option>
            </select>
            <ReactQuill
              theme="snow"
              value={desc}
              onChange={(evt) => {
                handleDesc(evt);
              }}
            />
            <button className="btn btn-success border-0 rounded-3 my-5">
              Add Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addblog;