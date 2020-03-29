import React from "react";

const LocationIcon = ({
  style = {},
  fill = "black",
  width = "22",
  height = "22",
  className = "",
  viewBox="0 0 22 22"
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
      <path fill = {fill} d="M10.9257442 16.9015654L11 17.014717l.0742558-.1131516.6046541-.958253c2.5777358-4.0593152 4.4412019-6.99418592 4.4412019-9.45877013 0-2.63077569-2.3443606-4.85491266-5.1201118-4.85491266-2.77575123 0-5.12011182 2.22413697-5.12011182 4.85491266 0 2.47519218 1.86346611 5.39591893 4.43766602 9.45523413l.60819.961789zM6.77802934 6.48454227c0-2.1215933 1.97308177-3.9567715 4.22197066-3.9567715 2.2488889 0 4.2184347 1.84932216 4.2184347 3.9567715 0 2.05087352-1.5240112 4.59678543-4.0345633 8.56062893L11 15.3351223l-.1838714-.2899511c-2.51055209-3.9603075-4.03809926-6.50975541-4.03809926-8.56062893zM11 8.43287211c-.9295674 0-1.68313068-.75356327-1.68313068-1.68313068 0-.92956741.75356328-1.68313068 1.68313068-1.68313068.9295674 0 1.6831307.75356327 1.6831307 1.68313068C12.6811856 7.67850198 11.9287605 8.43092706 11 8.43287211zm7.4255765 8.29896579c0 1.902362-3.2601817 3.3945493-7.4255765 3.3945493-4.16539484 0-7.42557654-1.4921873-7.42557654-3.3945493 0-1.283564 1.43207548-2.4009364 3.83654788-2.9879106l.08486373-.0212159.02121594.0848637.16265548.6753739.02121593.0848637-.08486373.021216c-1.92711391.4702865-3.18238994 1.3118518-3.18238994 2.1428092 0 1.2199161 2.63431167 2.524696 6.55572325 2.524696 3.9214116 0 6.5557233-1.3047799 6.5557233-2.524696 0-.8769252-1.4143955-1.7679944-3.4970929-2.217065h-.0848638l.01768-.0848637.1449755-.6824459.01768-.0848637.0848637.0176799c2.6307757.5445423 4.1972187 1.6902027 4.1972187 3.0515584z"/>
  </svg>
);

export default LocationIcon;
