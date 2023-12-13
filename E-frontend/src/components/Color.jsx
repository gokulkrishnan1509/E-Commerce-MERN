import React from "react";

function Color(props) {
  const { colorData, setColor } = props;

  return (
    <>
      <div>
        <ul className="colors ps-0">
          {colorData &&
            colorData.map((data, index) => {
              return (
                <li
                  onClick={() => setColor(data?._id)}
                  style={{ backgroundColor: data?.title }}
                  key={index}
                ></li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default Color;
