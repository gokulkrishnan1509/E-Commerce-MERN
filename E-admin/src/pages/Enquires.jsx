import React, { useEffect } from "react";
// *******************Antd Design***********************
import { Table } from "antd";
// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";

// **********************React router ******************
import { Link } from "react-router-dom";

// **************************React Icon *****************
import { AiFillDelete } from "react-icons/ai";

import { getEnquiry } from "../features/enquiry/enquirySlice";

const columns = [
  { title: "SNo", dataIndex: "Key" },
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Mobile", dataIndex: "mobile" },
  { title: "Status", dataIndex: "status" },
  { title: "Date", dataIndex: "date" },
  { title: "Action", dataIndex: "action" },
];

const Enquires = () => {
  const dispatch = useDispatch();
  const { enquiries } = useSelector((state) => state.enquery);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getEnquiry());
    });
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  const data1 = [];
  for (let i = 0; i < enquiries.length; i++) {
    data1.push({
      Key: i + 1,
      name: enquiries[i].name,
      email: enquiries[i].email,
      mobile: enquiries[i].mobile,
      date: new Date(enquiries[i].createdAt).toLocaleString(),
      status: (
        <>
          <select name="" id="" className="form-control form-select">
            <option value="">Select</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link className="ms-3 fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  return (
    <>
      <div>
        <h3 className="mb-4 title">Enquires</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
      </div>
    </>
  );
};

export default Enquires;
