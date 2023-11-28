import React, { useEffect } from "react";

// *********************Antd design**********************
import { Table } from "antd";

// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";

// **********************React router ******************
import { Link } from "react-router-dom";

// **************************React Icon *****************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { getColorsFromServer } from "../features/color/colorSlice";

const columns = [
  { title: "SNo", dataIndex: "Key" },
  { title: "Name", dataIndex: "name" },
  { title: "Action", dataIndex: "action" },
];

// let timeOut = setTimeout(() => {
//   dispatch(getUsers());
// }, 500);
// return () => {
//   clearTimeout(timeOut);
// };

const Colorlist = function () {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.color);
  const data1 = [];

  for (let i = 0; i < colors.length; i++) {
    data1.push({
      Key: i + 1,
      name: colors[i].title,
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link to="/" className="fs-3 text-danger ms-3">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getColorsFromServer());
    });
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  return (
    <>
      <div>
        <h3 className="mb-4 title">Color List</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
      </div>
    </>
  );
};

export default Colorlist;
