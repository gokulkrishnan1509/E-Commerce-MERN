import React from "react";
import { Link } from "react-router-dom";

const BlogCards = (props) => {
  const { id, title, description, date, image } = props;

  return (
    <>
      <div className="blog-card">
        <div className="card-image">
          <img src={image} className="img-fluid w-100" alt="blog" />
        </div>
        <div className="blog-content">
          <p className="date">{date}</p>
          <h5 className="title">{title}</h5>
          <p
            className="desc"
            dangerouslySetInnerHTML={{
              __html: description.substr(0, 70) + "...",
            }}
          >
            {/* {description} */}
          </p>
          <Link to={`/blog/${id}`} className="button a text-white">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCards;
