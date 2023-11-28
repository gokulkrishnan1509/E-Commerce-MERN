import React, { useEffect } from "react";

// ************Antd Design *******************
import { Table } from "antd";
// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";
// **********************React router ******************
import { Link } from "react-router-dom";
// **************************React Icon *****************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { getBlogCate } from "../features/blogcate/blogcateSlice";
// {
//   title: "Name",
//   dataIndex: "name",
//   sorter: (a, b) => {
//     const nameA = a.name.toUpperCase();
//     const nameB = b.name.toUpperCase();

//     if (nameA < nameB) {
//       return -1;
//     } else if (nameA > nameB) {
//       return 1;
//     } else {
//       return 0;
//     }
//   },
// },
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

const Blogcatalist = () => {
  const dispatch = useDispatch();
  const { blogcategory } = useSelector((state) => state.blogscategory);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getBlogCate());
    });

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  const data1 = [];

  for (let i = 0; i < blogcategory.length; i++) {
    data1.push({
      Key: i + 1,
      name: blogcategory[i].title,
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

  return (
    <>
      <div>
        <h3 className="mb-4 title">Blog Catagories</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
      </div>
    </>
  );
};

export default Blogcatalist;
