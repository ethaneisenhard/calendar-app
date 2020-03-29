import React from "react";

const HoursIcon = ({
  style = {},
  fill = "black",
  width = "18",
  height = "18",
  className = "",
  viewBox="0 0 18 18"
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
      <path fill = {fill} d="M9 16.6666667c-4.23418309 0-7.66666668-3.4324836-7.66666668-7.6666667 0-4.23418309 3.43248359-7.66666668 7.66666668-7.66666668 4.2341831 0 7.6666667 3.43248359 7.6666667 7.66666668C16.6629094 13.2326258 13.2326258 16.6629094 9 16.6666667zM9 2.35555554C5.33037465 2.35555554 2.35555554 5.33037465 2.35555554 9c0 3.6696253 2.97481911 6.6444445 6.64444446 6.6444445 3.6696253 0 6.6444445-2.9748192 6.6444445-6.6444445C15.6388155 5.3327088 12.6672912 2.36118455 9 2.35555554zm-.83481482 3.80948149h1.14488889v3.65274075h2.75318523v1.12444442H8.16518518V6.16503703z"/>
  </svg>
);

export default HoursIcon;
