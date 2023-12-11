import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCards from "../components/BlogCards";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs } from "../../features/blogs/blogSlice";
import moment from "moment";

function Blog() {
  const dispatch = useDispatch();

  const { blog } = useSelector((state) => state?.blog);


  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getAllBlogs());
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);


  return (
    <>
      <Meta title={"Blogs"}></Meta>
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Find By Catagories</h3>
                <ul className="ps-0">
                  <li>Works</li>
                  <li>Smooth</li>
                  <li>Policy</li>
                  <li>Mories</li>
                </ul>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {blog?.map((data, index) => {
                  return (
                    <div className="col-6 mb-3" key={index}>
                      <BlogCards
                        id={data?._id}
                        title={data?.title}
                        description={data?.description}
                        image={data?.images[0]?.url}
                        date={moment(data?.createdAt).format(
                          "YYYY-MM-DD, h:mm a"
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
