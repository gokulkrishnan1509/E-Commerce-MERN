import React, { useEffect, useState } from "react";

// ***********************Antd Design*******************
import { Divider, Table } from "antd";

//***********************react - icons *********************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

// *****************************React Router*******************
import { Link } from "react-router-dom";
// **********************React - Redux *****************
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductCateServer,
  getCategory,
} from "../features/pcategory/pcategorySlice";

import CustomModal from "../components/CustomModel";

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
  const [open, setOpen] = useState(false);
  const [pCateId, setCateId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCateId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const { pCategory } = useSelector((state) => state.pcategory);
  const data1 = [];

  for (let i = 0; i < pCategory.length; i++) {
    data1.push({
      Key: i + 1,
      name: pCategory[i].title,
      action: (
        <>
          <Link to={`/admin/category/${pCategory[i]._id}`} className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-tranparent border-0"
            onClick={() => showModal(pCategory[i]._id)}
          >
            <AiFillDelete />
          </button>
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

  const deleteProductCate = (e) => {
    dispatch(deleteProductCateServer(e));
    setOpen(false);
  };

  return (
    <>
      <div>
        <h3 className="mb-4 title">Category List</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteProductCate(pCateId);
          }}
          title="Are you sure you wnat to delete this Product Category?"
        />
      </div>
    </>
  );
};

export default Categorylist;
