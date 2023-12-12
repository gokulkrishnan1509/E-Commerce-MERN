import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { createQuerytoServer, resetState } from "../../features/contact/contactSlice";

const contactSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .nullable()
    .email("Email should be valid ")
    .required("Email is Required"),

  mobile: yup
    .string()
    .default("")
    .nullable()
    .required("Mobile Number is Required"),

  comment: yup.string().default("").nullable().required("Comment is Required"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuerytoServer(values));
      dispatch(resetState());
    },
  });

  return (
    <>
      <Meta title={"Contact Us"}></Meta>
      <BreadCrumb title="Contact Us" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31206.26405719425!2d78.1308844956772!3d12.126994197664583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac16f95a63ed01%3A0x3f2cb64e61c93aef!2sDharmapuri%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1698927834828!5m2!1sen!2sin"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="col-12 mt-5">
                <div className="contact-inner-wrapper  d-flex justify-content-between">
                  <div>
                    <h3 className="contact-title mb-4">Contact</h3>

                    <form
                      className="d-flex flex-column gap-15"
                      onSubmit={formik.handleSubmit}
                    >
                      <div>
                        <CustomInput
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          value={formik.values.name}
                          onChange={formik.handleChange("name")}
                          onBlur={formik.handleBlur("name")}
                        />
                        <div className="error">
                          {formik.touched.name && formik.errors.name}
                        </div>
                      </div>
                      <div>
                        <CustomInput
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={formik.values.email}
                          onChange={formik.handleChange("email")}
                          onBlur={formik.handleBlur("email")}
                        />
                        <div className="error">
                          {formik.touched.email && formik.errors.email}
                        </div>
                      </div>
                      <div>
                        <CustomInput
                          type="tel"
                          className="form-control"
                          placeholder="Mobile Number"
                          value={formik.values.mobile}
                          onChange={formik.handleChange("mobile")}
                          onBlur={formik.handleBlur("mobile")}
                        />
                        <div className="error">
                          {formik.touched.mobile && formik.errors.mobile}
                        </div>
                      </div>
                      <div>
                        <textarea
                          name=""
                          id=""
                          className="w-100 form-control"
                          cols="30"
                          rows="4"
                          placeholder="comments"
                          value={formik.values.comment}
                          onChange={formik.handleChange("comment")}
                          onBlur={formik.handleBlur("comment")}
                        ></textarea>
                        <div className="error">
                          {formik.touched.comment && formik.errors.comment}
                        </div>
                      </div>
                      <div>
                        <button className="button  text-white border-0" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  <div>
                    <h3 className="contact-title mb-4">Get in touch with us</h3>
                    <ul className="ps-0 list-style-none">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineHome className="fs-5" />
                        <address className="mb-0">
                          No:33 Mudaliarpet , Pondicheery
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel:+91 0987654321">+91 0987654321</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineMail className="fs-5" />
                        <a
                          href="mailto:patrick bateman1509@gmail.com
"
                        >
                          patrick bateman1509@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiInfoCircle className="fs-5 " />
                        <p className="mb-0">Monday - Friday 10AM -8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
