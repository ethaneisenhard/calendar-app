import React from "react";

const Footer = () => (
  <footer id="footer">
    <div className = "f-wrapper">
      © {new Date().getFullYear()}, Built By
      {` `}
      Ethan Eisenhard
    </div>
  </footer>
);

export default Footer;
