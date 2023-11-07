import React from "react";
import { Link } from "react-router-dom";

const BlogCards = () => {
  return (
    <>
      <div className="blog-card">
        <div className="card-image">
          <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
        </div>
        <div className="blog-content">
          <p className="date">11 June ,2022</p>
          <h5 className="title">A Beautiful Sunday morning renaissance</h5>
          <p className="desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Cupiditate, quod?
          </p>
          <Link to="/blog/:id" className="button a text-white">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCards;
