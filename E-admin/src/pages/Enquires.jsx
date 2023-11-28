import React, { useEffect } from "react";
// *******************Antd Design***********************
import { Table } from "antd";
// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";

// **********************React router ******************
import { Link } from "react-router-dom";

// **************************React Icon *****************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { getEnquiry } from "../features/enquiry/enquirySlice";

const columns = [
  { title: "SNo", dataIndex: "Key" },
  { title: "Name", dataIndex: "name" },
  { title: "Product", dataIndex: "product" },
  { title: "Status", dataIndex: "status" },
];

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    Key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Enquires = () => {

  const dispatch = useDispatch();
  const{enquiries} = useSelector((state)=>state.enquery)
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getEnquiry());
    });
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
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
