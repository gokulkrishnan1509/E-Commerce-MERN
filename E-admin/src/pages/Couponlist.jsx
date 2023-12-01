import React, { useEffect } from "react";

// *************************Antd Design **************************
import { Table } from "antd";
// ************************React Redux **************************
import { useDispatch, useSelector } from "react-redux";
// ***********************features folder ********************
import { getCouponFromServer } from "../features/coupon/couponSlice";

// ***********************React router **************************
import { Link } from "react-router-dom";
// **************************React Icon**********************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const columns = [
  { title: "SNo", dataIndex: "key" },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    },
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => {
      const nameA = a.discount;
      const nameB = b.discount;

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    },
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => {
      const nameA = a.expiry.toUpperCase();
      const nameB = b.expiry.toUpperCase();
      if (nameA < nameB) {
        return 1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    },
  },
  { title: "Action", dataIndex: "action" },
];

const Couponlist = function () {
  const dispatch = useDispatch();
  const { coupons } = useSelector((state) => state.coupon);
  const data1 = [];

  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getCouponFromServer());
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  for (let i = 0; i < coupons.length; i++) {
    data1.push({
      key: i + 1,
      name: coupons[i].name,
      discount: coupons[i].discount,
      expiry: new Date(coupons[i].expiry).toLocaleDateString(),

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
        <h3 className="mb-4 title">Coupons List</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"key"} />
        </div>
      </div>
    </>
  );
};

export default Couponlist;
