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

import {
  getAllUserOrderFromServer,
  updateUserOrderOnServer,
} from "../features/auth/authSlice";

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
  const { userOrders } = useSelector((state) => state.auth);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getAllUserOrderFromServer());
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  const data1 = [];

  for (let i = 0; i < userOrders?.length; i++) {
    // console.log(orders[i].)
    data1.push({
      Key: i + 1,
      name: userOrders[i]?.user?.name,
      // product: orders[i].products.map((i, j) => {
      //   return (
      //     // <>
      //     <ul key={j}>
      //       <li>{i.title}</li>
      //     </ul>
      //     // </>s
      //   );
      // }),

      product: (
        <Link
          to={`/admin/orders/${userOrders[i]?._id}`}
          style={{ textDecoration: "none", fontFamily: "Roboto,sans-serif" }}
        >
          View User Orders{" "}
        </Link>
      ),
      amount: userOrders[i]?.totalPrice,
      date: new Date(userOrders[i]?.createdAt).toLocaleDateString(),
      action: (
        <>
          <select
            name=""
            defaultValue={userOrders[i]?.orderStatus}
            onChange={(e) => {
              updateOrderStatus(userOrders[i]?._id, e.target.value);
            }}
            className="form-control form-select"
            id=""
          >
            <option
              value="Ordered"
              disabled
              defaultValue={userOrders[i]?.orderStatus === "Ordered"}
            >
              Ordered
            </option>
            <option
              value="Processed"
              defaultValue={userOrders[i]?.orderStatus === "Processed"}
            >
              Processed
            </option>
            <option
              value="Shipped"
              defaultValue={userOrders[i]?.orderStatus === "Shipped"}
            >
              Shipped
            </option>
            <option
              value="Out For Delivery"
              defaultValue={userOrders[i]?.orderStatus === "Out For Delivery"}
            >
              Out For Delivery
            </option>
            <option
              value="Delivered"
              defaultValue={userOrders[i]?.orderStatus === "Delivered"}
            >
              Delivered
            </option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (id, data) => {
    dispatch(updateUserOrderOnServer({ id: id, status: data }));
  };

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
