import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCards from "../components/BlogCards";
function Blog() {
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
                <div className="col-6 mb-3">
                  <BlogCards />
                </div>
                <div className="col-6 mb-3">
                  <BlogCards />
                </div>
                <div className="col-6 mb-3">
                  <BlogCards />
                </div>
                <div className="col-6 mb-3">
                  <BlogCards />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
