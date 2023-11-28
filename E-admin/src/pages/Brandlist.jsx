import React, { useEffect } from "react";

// *****************Antd Design **********************
import { Table } from "antd";

// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";

// *********************features folder******************
import { getBrands } from "../features/brand/brandSlice";

// **********************React router ******************
import { Link } from "react-router-dom";

// **************************React Icon *****************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const columns = [
  { title: "SNo", dataIndex: "Key" },
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
  { title: "Action", dataIndex: "action" },
];

const Brandlist = function () {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);

  const data1 = [];

  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getBrands());
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  for (let i = 0; i < brands.length; i++) {
    data1.push({
      Key: i + 1,
      name: brands[i].title,
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
        <h3 className="mb-4 title">Brand List</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
      </div>
    </>
  );
};

export default Brandlist;
