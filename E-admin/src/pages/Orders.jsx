import React, { useEffect } from "react";

// ************Ant Design ********************
import { Table } from "antd";
// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";
// **********************React router ******************
import { Link } from "react-router-dom";
// **************************React Icon *****************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { getOrders } from "../features/auth/authSlice";

const columns = [
  { title: "SNo", dataIndex: "Key" },
  { title: "Name", dataIndex: "name" },
  { title: "Product", dataIndex: "product" },
  { title: "Amount", dataIndex: "amount" },
  { title: "Date", dataIndex: "date" },
  { title: "Action", dataIndex: "action" },
];

function Orders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.auth);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getOrders());
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  // console.log(orders)
  const data1 = [];

  for (let i = 0; i < orders.length; i++) {
    data1.push({
      Key: i + 1,
      name: orders[i].orderby[0].name,
      product: orders[i].products.map((i,j) => {
        return (
          // <>
            <ul key={j}>
              <li>{i.title}</li>
            </ul>
          // </>s
        );
      }),
      amount: orders[i].paymentIntent.amount,
      date: new Date(orders[i].createdAt).toLocaleDateString(),
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
        <h3>Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
      </div>
    </>
  );
}

export default Orders;
