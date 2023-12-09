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

import { getOrders, getUserOrderFromServer } from "../features/auth/authSlice";

const columns = [
  { title: "SNo", dataIndex: "key" },
  { title: "Product Name", dataIndex: "name" },
  { title: "Brand", dataIndex: "brand" },
  { title: "Count", dataIndex: "count" },

  { title: "Color", dataIndex: "color" },
  { title: "Amount", dataIndex: "amount" },
  { title: "Date", dataIndex: "date" },
  { title: "Action", dataIndex: "action" },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[3];

  const { userOrder } = useSelector((state) => state.auth);
  const products2 = userOrder?.products;

  //  console.log(products2, "33333333")

  useEffect(() => {
    dispatch(getUserOrderFromServer(userId));
  }, [userId]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getOrders());
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  const data1 = [];

  for (let i = 0; i < products2?.length; i++) {
    data1.push({
      key: i + 1,
      name: products2[i]?.product?.title,
      brand: products2[i]?.product?.brand,
      count: products2[i]?.count,
      amount: products2[i]?.product?.price,
      color: products2[i]?.color,
      date: products2[i]?.product?.createdAt,
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link to="/" className="ms-3 fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
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
