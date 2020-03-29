import React from "react";

const ArrowIcon = ({
  style = {},
  fill = "black",
  width = "12",
  height = "12",
  className = "",
  viewBox="0 0 12 12"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
      <path fill = {fill} d="M3.79157407.88888888l-.87953704.8625 3.96962964 3.96962964L7.16064815 6l-.27898148.27898148-3.96962964 3.96962962.87953704.8625L8.87712964 6z"/>
  </svg>
);

export default ArrowIcon;
