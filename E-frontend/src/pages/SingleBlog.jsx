import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCards from "../components/BlogCards";
import blog from "../images/blog-1.jpg";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getOneBlogFromServer } from "../../features/blogs/blogSlice";
const SingleBlog = function () {
  const location = useLocation();
  const dispatch = useDispatch();
  const getBlogId = location.pathname.split("/")[2];
  const { oneBlog } = useSelector((state) => state.blog);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getOneBlogFromServer(getBlogId));
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, [getBlogId]);
  return (
    <>
      <Meta title={oneBlog?.title} />
      <BreadCrumb title={oneBlog?.title} />
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
                <h3 className="title">{oneBlog?.title}</h3>
                <img
                  src={oneBlog?.images[0].url}
                  className="img-fluid w-100 my-4"
                  alt="blog"
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: oneBlog?.description.substr(0, 70),
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
