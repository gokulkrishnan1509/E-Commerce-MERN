import React, { useEffect, useState } from "react";
// **************Antd Design *********************
import { Table } from "antd";

// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";

// **********************React router ******************
import { Link } from "react-router-dom";

// **************************React Icon *****************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getBlogs, resetState,deleteOneBlogToServer } from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModel";

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
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const { blogs } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getBlogs());
      dispatch(resetState());
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
          <Link
            to={`/admin/blog-add/${blogs[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogs[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBlog = (e) => {
    dispatch(deleteOneBlogToServer(e));
    setOpen(false);
  };
  return (
    <>
      <div>
        <h3 className="mb-4 title">Blog List</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => deleteBlog(blogId)}
          title={"Are you sure you want to delete this Blog !"}
        />
      </div>
    </>
  );
};

export default Bloglist;
