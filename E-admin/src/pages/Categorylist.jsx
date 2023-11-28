import React, { useEffect } from "react";

// ***********************Antd Design*******************
import { Divider, Table } from "antd";

//***********************react - icons *********************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

// *****************************React Router*******************
import { Link } from "react-router-dom";
// **********************React - Redux *****************
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../features/pcategory/pcategorySlice";

const columns = [
  { title: "SNo", dataIndex: "Key" },
  // sorter: (a, b) => a.title.localeCompare(b.title),
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  { title: "Action", dataIndex: "action" },
];

const Categorylist = function () {
  const dispatch = useDispatch();
  const { pCategory } = useSelector((state) => state.pcategory);
  const data1 = [];

  for (let i = 0; i < pCategory.length; i++) {
    data1.push({
      Key: i + 1,
      name: pCategory[i].title,
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link to="/" className="fs-3 ms-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getCategory());
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  return (
    <>
      <div>
        <h3 className="mb-4 title">Category List</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
      </div>
    </>
  );
};

export default Categorylist;
