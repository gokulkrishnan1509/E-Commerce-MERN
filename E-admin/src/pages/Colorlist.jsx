import React, { useEffect, useState } from "react";

// *********************Antd design**********************
import { Table } from "antd";

// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";

// **********************React router ******************
import { Link } from "react-router-dom";

// **************************React Icon *****************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import {
  deleteColorFromServer,
  getColorsFromServer,
} from "../features/color/colorSlice";
import CustomModal from "../components/CustomModel";

const columns = [
  { title: "SNo", dataIndex: "Key" },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  { title: "Action", dataIndex: "action" },
];

// let timeOut = setTimeout(() => {
//   dispatch(getUsers());
// }, 500);
// return () => {
//   clearTimeout(timeOut);
// };

const Colorlist = function () {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.color);
  const data1 = [];

  for (let i = 0; i < colors.length; i++) {
    data1.push({
      Key: i + 1,
      name: colors[i].title,
      action: (
        <>
          <Link
            to={`/admin/color/${colors[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>

          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(colors[i]._id)}
          >
            <AiFillDelete />
          </button>
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

  const deleteColor = (e) => {
    dispatch(deleteColorFromServer(e));

    setOpen(false);
  };
  return (
    <>
      <div>
        <h3 className="mb-4 title">Color List</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => deleteColor(colorId)}
          title="Are you sure you want delete this color ?"
        />
      </div>
    </>
  );
};

export default Colorlist;
