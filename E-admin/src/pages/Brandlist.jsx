import React, { useEffect, useState } from "react";

// *****************Antd Design **********************
import { Button, Table } from "antd";

// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";

// *********************features folder******************
import { deleteBrandToServer, getBrands, resetState } from "../features/brand/brandSlice";

// **********************React router ******************
import { Link } from "react-router-dom";

// **************************React Icon *****************
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

// *************************Components *************************
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
  { title: "Action", dataIndex: "action" },
];

const Brandlist = function () {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  function showModal(id) {
    setOpen(true);
    setBrandId(id);
  }

  function hideModal() {
    setOpen(false);
  }
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);

  const data1 = [];

  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(resetState());
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
          <Link
            to={`/admin/brand/${brands[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brands[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBrand = (e) => {
    dispatch(deleteBrandToServer(e))
    setOpen(false)
  };

  return (
    <>
      <div>
        <h3 className="mb-4 title">Brand List</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteBrand(brandId);
          }}
          title={"Are you sure you want to delete this brand?"}
        />
      </div>
    </>
  );
};

export default Brandlist;
