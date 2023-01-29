import React from "react";
import "./css/buysend.css";
require("dotenv").config();

function Swapping(props) {
  return (
    <div className="Send">
      <div className="inputs" style={{ width: "100%" }}>
        <h3 className="txt" style={{ color: "white" }}>
          Token Swap
          <br />
          <strong style={{ fontWeight: "700", color: "white" }}>
            {props.code}
          </strong>
        </h3>

        <h1 className="txt2"></h1>

        <button className="swap-notice-button" onClick={props.settercode}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Swapping;
