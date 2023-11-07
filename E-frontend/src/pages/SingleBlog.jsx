import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCards from "../components/BlogCards";
import blog from "../images/blog-1.jpg";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
const SingleBlog = function () {
  return (
    <>
      <Meta title={"Dynamic  Blog"} />
      <BreadCrumb title="Dynamic Blog" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link
                  to="/blogs"
                  className="a d-flex align-items-center gap-10 "
                >
                  <AiOutlineArrowLeft />
                  Go back to Blogs
                </Link>
                <h3 className="title">
                  A Beautiful Sunday Morning Renaissance
                </h3>
                <img
                  src={blog}
                  className="img-fluid w-100 my-4"
                  alt="blog"
                />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus, laboriosam corrupti! Soluta, natus doloribus.
                  Necessitatibus nihil dolorem eos, ea ipsum, nulla deserunt
                  natus voluptate consequuntur iure, voluptas aut fuga!
                  Obcaecati enim libero voluptatibus repudiandae necessitatibus
                  ea rerum iusto blanditiis modi sunt nobis totam nihil fugiat
                  cupiditate, natus at corporis nesciunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
