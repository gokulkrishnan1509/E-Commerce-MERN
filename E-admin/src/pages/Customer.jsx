import React, { useEffect } from "react";

// ******************Antd Design************************
import { Table } from "antd";

// *********************React-Redux*********************
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

const columns = [
  { title: "SNo", dataIndex: "Key" },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  { title: "Product", dataIndex: "email" },
  { title: "Mobile", dataIndex: "mobile" },
];

const Customers = function () {
  const state = useSelector((state) => state.customer["customers"]);

  const dispatch = useDispatch();
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getUsers());
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  const data1 = [];

  for (let i = 0; i < state.length; i++) {
    if (state[i].role !== "admin" && state[i].role !== "super admin") {
      data1.push({
        Key: i + 1,
        name: state[i].name,
        email: state[i].email,
        mobile: state[i].mobile,
      });
    }
  }
  // const data1 = state
  //   .filter((item) => item.role !== "admin" && item.role !== "super admin")
  //   .map((item, index) => ({
  //     Key: index + 1,
  //     name: item.name,
  //     email: item.email,
  //     mobile: item.mobile,
  //   }));

  // function onChange(pagination,filters,sorter,extra){
  //   console.log(pagination,filters)

  // }

  return (
    <>
      <div>
        <h3 className="mb-4 title">Customers</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"}  />
        </div>
      </div>
    </>
  );
};

export default Customers;
