import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOneEnquiryFromServer,
  getEnquiry,
  getOneEnquiryFromServer,
  getUpdateEnqiryFromServer,
  resetState,
} from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const location = useLocation();
  const getEnqId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = useSelector(
    (state) => state.enquery
  );
  useEffect(() => {
    dispatch(getOneEnquiryFromServer(getEnqId));
  }, [getEnqId,enqStatus]);

  const setEnquiryStatus = (e, id) => {
    const data = { id: id, enqData: e };
    dispatch(getUpdateEnqiryFromServer(data))
     
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-4 title">View Enquiry</h3>

          <button
            className="bg-transparent border-0  d-flex align-items-center gap-1 fs-5 "
            onClick={goBack}
          >
            <BiArrowBack className="fs-5 mb-0" /> Go Back
          </button>
        </div>
        <div className="mt-5 bg-white p-4 rounded-3">
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0"> Name:</h5>
            <p className="mb-0">{enqName}</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0">Mobile:</h5>
            <p className="mb-0">
              <a href={`tel:+91${enqMobile}`}>{enqMobile}</a>
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0"> Email:</h5>
            <p className="mb-0">
              <a href={`mailto:${enqMobile}`}>{enqEmail}</a>
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0">Status:</h5>
            <p className="mb-0">{enqStatus}</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Change Status:</h6>
            <div>
              <select
                name=""
                className="form-control form-select"
                id=""
                defaultValue={enqStatus ? enqStatus : "Submitted"}
                onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
              >
                <option value="Submitted">Submitted</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEnq;
