import React, { useEffect } from "react";

// *****************************Ant Design *******************************
import { Table } from "antd";

// ****************************React Redux *******************************
import { useDispatch, useSelector } from "react-redux";
// ****************************React Router ******************************
import { Link, useLocation } from "react-router-dom";

// ****************************React Icon ********************************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { getAllUserOrderFromServer, getUserOrderFromServer } from "../features/auth/authSlice";

const columns = [
  { title: "SNo", dataIndex: "key" },
  { title: "Product Name", dataIndex: "name" },
  { title: "Brand", dataIndex: "brand" },
  { title: "Count", dataIndex: "count" },

  { title: "Color", dataIndex: "color" },
  { title: "Amount", dataIndex: "amount" },
  { title: "Date", dataIndex: "date" },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];

  const { userOrder } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserOrderFromServer(orderId));
  }, [orderId]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getAllUserOrderFromServer());
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  const data1 = [];

  for (let i = 0; i < userOrder?.orderItems?.length; i++) {

    data1.push({
      key: i + 1,
    name: userOrder?.orderItems[i]?.product?.title,
    brand:userOrder?.orderItems[i]?.product?.brand,
    count:userOrder?.orderItems[i]?.quantity,
    amount:userOrder?.orderItems[i]?.price,
    color:userOrder?.orderItems[i]?.color?.title,
    date :new Date(userOrder[i]?.createdAt).toLocaleDateString() 


    
    });
  }

  return (
    <>
      <div>
        <h3>View Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"key"} />
        </div>
      </div>
    </>
  );
};

export default ViewOrder;
