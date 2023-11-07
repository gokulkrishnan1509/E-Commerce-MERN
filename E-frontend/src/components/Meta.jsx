import React, { useEffect } from "react";

function Meta(props) {
  useEffect(() => {
    document.title = props.title; // Set the document title to the value of props.title
  }, [props.title]); // Update the title whenever props.title changes

  return null; // This component doesn't render anything
}

export default Meta;
