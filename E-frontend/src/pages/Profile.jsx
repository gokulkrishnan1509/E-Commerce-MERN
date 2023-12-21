import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetailsatServer } from "../../features/user/userSlice";
import {FiEdit} from "react-icons/fi"

const profileSchema = yup.object({
  name: yup.string().required("Name is Required "),
  email: yup.string().required("email is required"),
  mobile: yup.string().required("Mobile No is Required"),
});



const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const [edit, setEdit] = useState(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUserDetailsatServer(values));
      setEdit(true)
      if(edit ===false){
        window.location.reload()
      }
    },
  });
  return (
    <>
      <BreadCrumb title="My Profile" />
      <div className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="my-3">Update Profile</h3>
                 <FiEdit className="fs-3" onClick={()=>{setEdit(false)}}/>
              </div>
            </div>
            <div className="col-12">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="example1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="example1"
                    disabled={edit}
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                  />
                  <div className="error">
                    {formik.touched.name && formik.errors.name}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    disabled={edit}
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail2" className="form-label">
                    Mobile No
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    className="form-control"
                    id="exampleInputEmail2"
                    aria-describedby="emailHelp"
                    disabled={edit}
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>

                {edit === false && (
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
