import React, { useEffect, useState } from "react";

// ************Antd Design *******************
import { Table } from "antd";
// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";
// **********************React router ******************
import { Link } from "react-router-dom";
// **************************React Icon *****************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import {
  deleteOneBlogCateFromServer,
  getBlogCate,
  resetState,
} from "../features/blogcate/blogcateSlice";
import CustomModal from "../components/CustomModel";
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
  const [open, setOpen] = useState(false);
  const [blogCatID, setblogCatId] = useState("");

  const dispatch = useDispatch();
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const { blogcategory } = useSelector((state) => state.blogscategory);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getBlogCate());
      dispatch(resetState())
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
          <Link to={`/admin/blog-category/${blogcategory[i]._id}`} className="fs-3 text-danger">
            <BiEdit />
          </Link>

          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0 "
            onClick={() => showModal(blogcategory[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBlogCate = (e) => {
    dispatch(deleteOneBlogCateFromServer(e));
    setOpen(false)
  };

  return (
    <>
      <div>
        <h3 className="mb-4 title">Blog Catagories</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => deleteBlogCate(blogCatID)}
          title={"Are you sure you want to delete this Blog Category"}
        />
      </div>
    </>
  );
};

export default Blogcatalist;
