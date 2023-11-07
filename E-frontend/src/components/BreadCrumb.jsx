import React from "react";
import { Link, useLocation } from "react-router-dom";
const BreadCrumb = (props) => {
  const { title } = props;
  // const location = useLocation();

  // let crumbLink = "";
  // const crumPath = location.pathname
  //   .split("/")
  //   .filter((path) => path !== "")
  //   .map((crum) => {
  //     crumbLink += `/${crum}`;
  //     return (
  //       <Link to={crumbLink} key={crum}>
  //         {crum}
  //       </Link>
  //     );
  //   });
  return (
    <>
      <div className="breadcrumb mb-0 py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
                <p className="text-center">
                <Link to="/" className="a text-dark">Home &nbsp;</Link>/ {title}

                {/* <div>
      /{crumPath}
      </div> */}
                </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BreadCrumb;

