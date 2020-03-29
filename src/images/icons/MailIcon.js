import React from "react";

const MailIcon = ({
  style = {},
  fill = "black",
  width = "29",
  height = "29",
  className = "",
  viewBox = "0 0 29 29"
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
    <defs>
      <path id="a" d="M.00002266.05558103H29V29H.00002266z" />
    </defs>
    <g fill="none">
      <path
        fill="#000"
        d="M3.38333711 14.5813131L1.24555 13.0376425l2.13778711-1.9676472v3.5113178zm1.45-11.63041329H24.1667082c.2668906 0 .4833145.21594541.4833145.48237231V15.2798004l-9.8667403 7.1307212c-.1690722.1219922-.3975039.1219922-.5665195 0l-9.86679688-7.1307212V3.43327212c0-.2664269.21642382-.48237231.48337109-.48237231zm9.34134179-1.8065926c.1840254-.16212865.4596387-.16399415.6457598-.00429629l.9208066.84608772H13.2588l.9158789-.84179143zM27.7544387 13.0362292l-2.1377871 1.5450839v-3.5113178l2.1377871 1.9662339zm-16.589416 8.359349l2.4857304 1.7964171c.5069336.3678421 1.1935313.3678421 1.7004082 0l2.4838047-1.7964171 9.1901113 6.6396432H1.97491133l9.19011137-6.6396432zM.96665156 27.5528491V14.0260733l9.37328714 6.7732807L.97005 27.5702039c0-.0062749-.00339844-.0111365-.00339844-.0173548zm27.06668554 0c0 .0062183-.0033418.0110799-.0033418.0173548L18.66005 20.799354l9.3732871-6.7732807v13.5267758zm.9560371-14.5354444c-.0038515-.0281521-.0101953-.0559084-.0188613-.0829864-.0053242-.0154327-.0057774-.0318265-.0120645-.0482202-.0090058-.0167895-.0192011-.0329006-.0304726-.0482203-.0082129-.0140195-.0101387-.0299045-.0197676-.0434152-.0096855-.0135107-.0193711-.0159415-.027584-.0256082-.009459-.0133411-.0196543-.02623-.0304726-.0385536 0 0-.0033418-.0058226-.0057774-.0077447l-3.2277226-2.96478359V3.43327212c0-.7992807-.6492149-1.44717348-1.4499434-1.44717348h-6.9986855L15.4695969.42552554c-.5539453-.49492203-1.392793-.49305653-1.9444727.00440935l-1.6931015 1.55616375H4.83333711c-.8008418 0-1.45.64789278-1.45 1.44717348v6.32460039L.15561445 12.7265002c-.0023789 0-.0033418.0053138-.00577734.0077446-.01081836.0123236-.02095703.0252125-.03041602.0386102-.00826953.0096101-.01988086.0149239-.02758398.0255516-.00775977.0106277-.01161133.0293957-.01982422.0434152-.01127148.0153197-.0214668.0314874-.03047266.0482768-.00623046.0144152-.00674023.030809-.01206445.0482203-.00866601.027078-.01500976.0547778-.01886133.0829298-.00436132.016733-.00792968.0336355-.0105918.0506511v14.4809493c0 .7992242.6491582 1.4471735 1.45000001 1.4471735H27.5500227c.8007851 0 1.45-.6479493 1.45-1.4471735V13.0718998c-.0025489-.0183158-.0061172-.0365185-.0106485-.0544951z"
        mask="url(#b)"
      />
      <path
        fill="#000"
        d="M7.50003767 16H20.5000209C20.7761725 16 21 15.7761177 21 15.4999707 21 15.2238238 20.7761725 15 20.5000209 15H7.50003767C7.22388609 15 7 15.2238238 7 15.4999707 7 15.7761177 7.22388609 16 7.50003767 16m9.99998063 1h-7.0000366C10.2238287 17 10 17.2238369 10 17.5s.2238287.5.4999817.5h7.0000366C17.7761713 18 18 17.7761631 18 17.5s-.2238287-.5-.4999817-.5m-1.0000549 2H13.499978C13.223827 19 13 19.2238823 13 19.4999707c0 .276147.223827.5000293.499978.5000293h2.9999854C16.7761144 20 17 19.7761177 17 19.4999707 17 19.2238823 16.7761144 19 16.4999634 19"
      />
    </g>
  </svg>
);

export default MailIcon;
