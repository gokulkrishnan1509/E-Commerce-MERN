import React, { useEffect } from "react";
// **************Antd Design *********************
import { Table } from "antd";

// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";

// **********************React router ******************
import { Link } from "react-router-dom";

// **************************React Icon *****************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getBlogs } from "../features/blogs/blogSlice";


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
  { title: "Category", dataIndex: "category" },
  { title: "Action", dataIndex: "action" },
];

const Bloglist = () => {
  const { blogs } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getBlogs());
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  const data1 = [];

  for (let i = 0; i < blogs.length; i++) {
    data1.push({
      Key: i + 1,
      name: blogs[i].title,
      category: blogs[i].category,
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

  return (
    <>
      <div>
        <h3 className="mb-4 title">Blog List</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
      </div>
    </>
  );
};

export default Bloglist;
