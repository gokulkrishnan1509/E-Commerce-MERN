import React, { useEffect, useState } from "react";
// *******************Antd Design***********************
import { Table } from "antd";
// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";

// **********************React router ******************
import { Link } from "react-router-dom";

// **************************React Icon *****************
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";

import {
  deleteOneEnquiryFromServer,
  getEnquiry,
  getUpdateEnqiryFromServer,
  resetState,
} from "../features/enquiry/enquirySlice";
import CustomModel from "../components/CustomModel";

const columns = [
  { title: "SNo", dataIndex: "Key" },
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Mobile", dataIndex: "mobile" },
  { title: "Status", dataIndex: "status" },
  { title: "Date", dataIndex: "date" },
  { title: "Action", dataIndex: "action" },
];

const Enquires = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const deleteEnquiry = (id) => {
    dispatch(deleteOneEnquiryFromServer(id));
    setOpen(false);
  };

  const setEnquiryStatus = (e, id) => {
    const data = { id: id, enqData: e };

    dispatch(getUpdateEnqiryFromServer(data));
  };
  const { enquiries } = useSelector((state) => state.enquery);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getEnquiry());
      dispatch(resetState());
    });
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  const data1 = [];
  for (let i = 0; i < enquiries.length; i++) {
    data1.push({
      Key: i + 1,
      name: enquiries[i].name,
      email: enquiries[i].email,
      mobile: enquiries[i].mobile,
      date: new Date(enquiries[i].createdAt).toLocaleString(),
      status: (
        <>
          <select
            name=""
            id=""
            defaultValue={
              enquiries[i].status ? enquiries[i].status : "Submitted"
            }
            className="form-control form-select"
            onChange={(e) => setEnquiryStatus(e.target.value, enquiries[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/enquiries/${enquiries[i]._id}`}
          >
            <AiOutlineEye />
          </Link>

          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiries[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <>
      <div>
        <h3 className="mb-4 title">Enquires</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
        <CustomModel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteEnquiry(enqId);
          }}
          title="Are you sure you want to delete this Enquiry?"
        />
      </div>
    </>
  );
};

export default Enquires;
